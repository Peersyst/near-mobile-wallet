import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetTransactions = (index?: number): QueryResult<FullTransaction[]> => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["transactions", usedIndex], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex);
        return serviceInstance?.getTransactions();
    });
};

export default useGetTransactions;
