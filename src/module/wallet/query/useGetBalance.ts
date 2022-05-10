import { useQuery } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetBalance = (index?: number) => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["balance", usedIndex], () => serviceInstancesMap.get(usedIndex)?.getCKBBalance(), { refetchInterval: 1500 });
};

export default useGetBalance;
