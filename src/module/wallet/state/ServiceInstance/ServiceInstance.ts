import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import { BaseNearSdkParms, CreateServiceInstanceParams, SetServiceParams } from "./ServiceInstance.types";

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

export const createNearSDKService = async ({
    nameId,
    mnemonic,
    privateKey,
    network,
}: Omit<CreateServiceInstanceParams, "serviceIndex">): Promise<NearSDKService | undefined> => {
    let service: NearSDKService;
    const { nodeUrl, indexerUrl } = BASE_NEAR_SDK_PARAMS[network];
    if (mnemonic) {
        service = await NearSDKService.importFromMnemonic(network, nodeUrl, indexerUrl, mnemonic, nameId);
    } else if (privateKey) {
        service = await NearSDKService.importFromSecretKey(network, nodeUrl, indexerUrl, privateKey, nameId);
    } else {
        console.warn("You should provide at least one mnemonic or a private key to create and instance");
        return;
    }
    return service;
};

export const setService = async ({ network, serviceIndex, service }: SetServiceParams) => {
    if (!serviceInstancesMap.has(network)) {
        console.warn("Network not supported");
        return;
    }
    const services = serviceInstancesMap.get(network) ?? [];
    services[serviceIndex] = service;
    serviceInstancesMap.set(network, services);
};

export const createServiceInstance = async ({ network, serviceIndex, ...rest }: CreateServiceInstanceParams) => {
    const service = await createNearSDKService({ network, ...rest });
    if (service) {
        setService({ serviceIndex, network, service });
    }
};
