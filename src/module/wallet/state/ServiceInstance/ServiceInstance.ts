import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import {
    BaseNearSdkParms,
    CreateInstanceReturn,
    CreateServiceInstanceParams,
    SetServiceParams,
    SetServicesParams,
} from "./ServiceInstance.types";

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

export default class ServiceInstance {
    static async createNearSDKService({
        privateKey,
        network,
        mnemonic,
    }: Omit<CreateServiceInstanceParams, "serviceIndex">): Promise<NearSDKService[]> {
        let services: NearSDKService[] = [];
        const { nodeUrl, indexerUrl } = BASE_NEAR_SDK_PARAMS[network];
        if (mnemonic) {
            services = await NearSDKService.importFromMnemonic(network, nodeUrl, indexerUrl, mnemonic);
        } else if (privateKey) {
            services = await NearSDKService.importFromSecretKey(network, nodeUrl, indexerUrl, privateKey);
        } else {
            console.warn("You should provide at least one mnemonic or a private key to create and instance");
            return services;
        }
        return services;
    }

    static async setService({ network, serviceIndex, service }: SetServiceParams) {
        const services = ServiceInstance.getServices(network);
        services[serviceIndex] = service;
        serviceInstancesMap.set(network, services);
    }

    static getServices(network: NetworkType): NearSDKService[] {
        return serviceInstancesMap.get(network) ?? [];
    }

    static setServices({ network, services }: SetServicesParams) {
        serviceInstancesMap.set(network, services);
    }

    static async createServiceInstance({ network, ...rest }: CreateServiceInstanceParams): Promise<CreateInstanceReturn[]> {
        const services = await ServiceInstance.createNearSDKService({ network, ...rest });
        ServiceInstance.setServices({ network, services });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
    }

    /**
     * Create new services instances and set them to the serviceInstancesMap
     * @returns Array of the all the addresses associated with the privateKey
     */
    static async addServiceInstances({ network, ...rest }: CreateServiceInstanceParams): Promise<CreateInstanceReturn[]> {
        const services = await ServiceInstance.createNearSDKService({ network, ...rest });
        const currentServices = ServiceInstance.getServices(network);
        ServiceInstance.setServices({ network, services: [...currentServices, ...services] });
        return services.map((s) => ({ account: s.getAddress(), privateKey: s.getKeyPair() }));
    }
}
