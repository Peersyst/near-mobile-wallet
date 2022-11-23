import { NearSDKService } from "near-peersyst-sdk";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { NetworkType } from "module/settings/state/SettingsState";
import { serviceInstancesMap } from "../state/WalletState";
import useSelectedWalletIndex from "./useSelectedWalletIndex";

export interface useServiceInstanceReturn {
    index: number;
    network: NetworkType;
    serviceInstance: NearSDKService;
}

export default function useServiceInstance(index?: number): useServiceInstanceReturn {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index !== undefined ? index : selectedWallet;
    const serviceInstance = serviceInstancesMap.get(usedIndex)?.[network]!;
    return { serviceInstance, network, index: usedIndex };
}
