import { useQuery } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";

const useGetTransactions = (index?: number) => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["transactions", usedIndex], (): any => serviceInstance?.getTransactions());
};

export default useGetTransactions;
