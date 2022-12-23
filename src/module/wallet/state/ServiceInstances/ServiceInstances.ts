import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import {
    AddServiceParams,
    BaseNearSdkParams,
    CreateInstanceReturn,
    CreateServiceInstancesParams,
    SetServiceParams,
    SetServicesParams,
} from "./ServiceInstances.types";

export const serviceInstancesMap = new Map<NetworkType, NearSDKService[]>();

const TESTNET_PARAMS: BaseNearSdkParams = {
    nodeUrl: config.testnetNodeUrl,
    indexerUrl: config.indexerTestnetUrl,
};

const MAINNET_PARAMS: BaseNearSdkParams = {
    nodeUrl: config.mainnetNodeUrl,
    indexerUrl: config.indexerMainnetUrl,
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
        services.push(service);
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
    }: Omit<CreateServiceInstancesParams, "serviceIndex">): Promise<NearSDKService[]> {
        let services: NearSDKService[] = [];
        const { nodeUrl, indexerUrl } = BASE_NEAR_SDK_PARAMS[network];
        if (mnemonic) {
            services = await NearSDKService.importFromMnemonic({
                chain: network,
                nodeUrl,
                baseApiUrl: indexerUrl,
                mnemonic,
                enableIndexer: config.enableIndexer,
            });
        } else if (privateKey) {
            services = await NearSDKService.importFromSecretKey({
                chain: network,
                nodeUrl,
                baseApiUrl: indexerUrl,
                secretKey: privateKey,
                enableIndexer: config.enableIndexer,
            });
        } else {
            /* eslint-disable no-console */
            console.warn("You should provide at least one mnemonic or a private key to create and instance");
            return services;
        }
        return services;
    }

    async initializeServiceInstances({ network, ...rest }: CreateServiceInstancesParams): Promise<CreateInstanceReturn[]> {
        const services = await this.createServiceInstances({ network, ...rest });
        this.setServiceInstances({ network, services });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
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
})();
