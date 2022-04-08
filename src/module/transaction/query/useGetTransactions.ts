import { useQuery } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { QueryResult } from "query-utils";
import { FullTransaction } from "module/common/service/CkbSdkService.types";

const useGetTransactions = (index?: number): QueryResult<FullTransaction[]> => {
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
