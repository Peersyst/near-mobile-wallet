import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import {
    BaseNearSdkParms,
    CreateInstanceReturn,
    CreateServiceInstancesParams,
    SetServiceParams,
    SetServicesParams,
} from "./ServiceInstances.types";

export const serviceInstancesMap = new Map<NetworkType, NearSDKService[]>();

const TESTNET_PARAMS: BaseNearSdkParms = {
    nodeUrl: config.testnetNodeUrl,
    indexerUrl: config.indexerTestnetUrl,
};

const MAINNET_PARAMS: BaseNearSdkParms = {
    nodeUrl: config.mainnetNodeUrl,
    indexerUrl: config.indexerMainnetUrl,
};

const BASE_NEAR_SDK_PARAMS: Record<NetworkType, BaseNearSdkParms> = {
    [Chains.TESTNET]: TESTNET_PARAMS,
    [Chains.MAINNET]: MAINNET_PARAMS,
};

export default new (class ServiceInstances {
    private async createServiceInstance({
        privateKey,
        network,
        mnemonic,
    }: Omit<CreateServiceInstancesParams, "serviceIndex">): Promise<NearSDKService[]> {
        let services: NearSDKService[] = [];
        const { nodeUrl, indexerUrl } = BASE_NEAR_SDK_PARAMS[network];
        if (mnemonic) {
            services = await NearSDKService.importFromMnemonic(network, nodeUrl, indexerUrl, mnemonic);
        } else if (privateKey) {
            services = await NearSDKService.importFromSecretKey(network, nodeUrl, indexerUrl, privateKey);
        } else {
            /* eslint-disable no-console */
            console.warn("You should provide at least one mnemonic or a private key to create and instance");
            return services;
        }
        return services;
    }

    async setService({ network, serviceIndex, service }: SetServiceParams) {
        const services = this.getServiceInstances(network);
        services[serviceIndex] = service;
        serviceInstancesMap.set(network, services);
    }

    getServiceInstance(network: NetworkType, index: number): NearSDKService | undefined {
        return serviceInstancesMap.get(network)?.[index];
    }

    getServiceInstances(network: NetworkType): NearSDKService[] {
        return serviceInstancesMap.get(network) ?? [];
    }

    setServiceInstances({ network, services }: SetServicesParams) {
        serviceInstancesMap.set(network, services);
    }

    async createServiceInstances({ network, ...rest }: CreateServiceInstancesParams): Promise<CreateInstanceReturn[]> {
        const services = await this.createServiceInstance({ network, ...rest });
        this.setServiceInstances({ network, services });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
    }

    /**
     * Create new services instances and set them to the serviceInstancesMap
     * @returns Array of the all the addresses associated with the privateKey
     */
    async addServiceInstances({ network, ...rest }: CreateServiceInstancesParams): Promise<CreateInstanceReturn[]> {
        const services = await this.createServiceInstance({ network, ...rest });
        const currentServices = this.getServiceInstances(network);
        this.setServiceInstances({ network, services: [...currentServices, ...services] });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
    }
})();
