import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import {
    AddManualServiceInstanceParams,
    AddServiceParams,
    BaseNearSdkParams,
    CreateInstanceReturn,
    CreateServiceInstancesParams,
    RecoverInstancesReturn,
    SetServiceParams,
    SetServicesParams,
} from "./ServiceInstances.types";

export const serviceInstancesMap = new Map<NetworkType, NearSDKService[]>();

const TESTNET_PARAMS: BaseNearSdkParams = {
    nodeUrl: config.testnetNodeUrl,
    archivalNodeUrl: config.testnetNodeUrl,
};

const MAINNET_PARAMS: BaseNearSdkParams = {
    nodeUrl: config.mainnetNodeUrl,
    archivalNodeUrl: config.mainnetNodeUrl,
};

const BASE_NEAR_SDK_PARAMS: Record<NetworkType, BaseNearSdkParams> = {
    [Chains.TESTNET]: TESTNET_PARAMS,
    [Chains.MAINNET]: MAINNET_PARAMS,
};

export default new (class ServiceInstances {
    getServiceInstance(network: NetworkType, index: number): NearSDKService | undefined {
        return serviceInstancesMap.get(network)?.[index];
    }

    setService({ network, serviceIndex, service }: SetServiceParams) {
        const services = this.getServiceInstances(network);
        services[serviceIndex] = service;
        serviceInstancesMap.set(network, services);
    }

    addService({ network, service }: AddServiceParams) {
        const services = this.getServiceInstances(network);
        this.setServiceInstances({ network, services: [...services, service] });
    }

    getServiceInstances(network: NetworkType): NearSDKService[] {
        return serviceInstancesMap.get(network) ?? [];
    }

    setServiceInstances({ network, services }: SetServicesParams) {
        serviceInstancesMap.set(network, services);
    }

    private async createServiceInstances({
        privateKey,
        network,
        mnemonic,
        likelyNameIds,
    }: Omit<CreateServiceInstancesParams, "serviceIndex">): Promise<NearSDKService[]> {
        let services: NearSDKService[] = [];
        const { nodeUrl } = BASE_NEAR_SDK_PARAMS[network];
        if (mnemonic) {
            services = await NearSDKService.importFromMnemonic({
                chain: network,
                nodeUrl,
                mnemonic,

                likelyNameIds,
            });
        } else if (privateKey) {
            services = await NearSDKService.importFromSecretKey({
                chain: network,
                nodeUrl,
                secretKey: privateKey,

                likelyNameIds,
            });
        } else {
            /* eslint-disable no-console */
            console.warn("You should provide at least one mnemonic or a private key to create and instance");
            return services;
        }
        return services;
    }

    async recoverServiceInstances({ network, ...rest }: CreateServiceInstancesParams): Promise<RecoverInstancesReturn[]> {
        const services = await this.createServiceInstances({ network, ...rest });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair(), service: s }));
    }

    /**
     * Create new services instances and set them to the serviceInstancesMap
     * @returns Array of the all the addresses associated with the privateKey
     */
    async addServiceInstances({ network, ...rest }: CreateServiceInstancesParams): Promise<CreateInstanceReturn[]> {
        const services = await this.createServiceInstances({ network, ...rest });
        const currentServices = this.getServiceInstances(network);
        this.setServiceInstances({ network, services: [...currentServices, ...services] });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
    }

    async addManualServiceInstance({ network, secretKey, accountId }: AddManualServiceInstanceParams): Promise<NearSDKService> {
        const { nodeUrl } = BASE_NEAR_SDK_PARAMS[network];
        const service = await NearSDKService.createFromSecretKey({
            chain: network,
            nodeUrl,
            secretKey,

            nameId: accountId,
        });
        this.addService({ network, service });
        return service;
    }
})();
