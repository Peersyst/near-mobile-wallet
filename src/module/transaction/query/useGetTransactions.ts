import { useQuery } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { Transaction } from "module/common/service/mock/CkbServiceMock.types";
import { QueryResult } from "query-utils";

const useGetTransactions = (index?: number):QueryResult<Transaction[]> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let usedIndex = 0;
    if (index !== undefined) usedIndex = index;
    else if (selectedWallet !== undefined) {
        usedIndex = selectedWallet < wallets.length ? selectedWallet : wallets.length - 1;
    }
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["transactions", usedIndex], () => serviceInstance?.getTransactions());
};

export default useGetTransactions;
