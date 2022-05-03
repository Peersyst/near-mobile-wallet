import { useQuery } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetBalance = (index?: number) => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["balance", usedIndex], () => serviceInstance?.getCKBBalance(), { refetchInterval: 1500 });
};

export default useGetBalance;
