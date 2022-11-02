import { NearSDKService } from "module/common/service/NearSdkService";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { NetworkType } from "module/settings/state/SettingsState";
import { serviceInstancesMap } from "../state/WalletState";
import useSelectedWalletIndex from "./useSelectedWalletIndex";

export interface UseGetServiceInstanceReturn {
    index: number;
    network: NetworkType;
    serviceInstance: NearSDKService;
}

export default function useGetServiceInstance(index?: number): UseGetServiceInstanceReturn {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const serviceInstance = serviceInstancesMap.get(index || selectedWallet)![network];
    return { serviceInstance, network, index: usedIndex };
}
