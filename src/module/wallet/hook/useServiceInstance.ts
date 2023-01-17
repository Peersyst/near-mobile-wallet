import { NearSDKService } from "near-peersyst-sdk";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { NetworkType } from "module/settings/state/SettingsState";
import useSelectedWalletIndex from "./useSelectedWalletIndex";
import ServiceInstances from "../state/ServiceInstances/ServiceInstances";

export interface useServiceInstanceReturn {
    index: number;
    network: NetworkType;
    serviceInstance: NearSDKService;
    isSelectedWallet: boolean;
    queryEnabled: boolean;
}

export default function useServiceInstance(index?: number, onlySelectedWallet = false): useServiceInstanceReturn {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index !== undefined ? index : selectedWallet;
    const serviceInstance = ServiceInstances.getServiceInstance(network, usedIndex)!;
    const isSelectedWallet = usedIndex === selectedWallet;
    const queryEnabled = !!serviceInstance && (onlySelectedWallet ? isSelectedWallet : true);
    return { serviceInstance, network, index: usedIndex, isSelectedWallet, queryEnabled };
}
