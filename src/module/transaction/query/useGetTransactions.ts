import { useQuery } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { Transaction } from "module/common/service/mock/CkbServiceMock.types";

const useGetTransactions = (index?: number) => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["transactions", usedIndex], (): Promise<Transaction[]> | undefined => serviceInstance?.getTransactions());
};

export default useGetTransactions;
