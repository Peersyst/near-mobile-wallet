import { NearSDKService } from "near-peersyst-sdk";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { NetworkType } from "module/settings/state/SettingsState";
import useSelectedWalletIndex from "./useSelectedWalletIndex";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";

export interface useServiceInstanceReturn {
    index: number;
    network: NetworkType;
    serviceInstance: NearSDKService;
    queryEnabled: boolean;
}

export default function useServiceInstance(index?: number): useServiceInstanceReturn {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index !== undefined ? index : selectedWallet;
    const serviceInstance = ServiceInstances.getServiceInstance(network, usedIndex)!;
    const queryEnabled = !!serviceInstance;
    return { serviceInstance, network, index: usedIndex, queryEnabled };
}
