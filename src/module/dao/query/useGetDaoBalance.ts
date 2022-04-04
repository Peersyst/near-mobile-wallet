import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DaoBalanceType } from "../types";
import useWalletState from "module/wallet/hook/useWalletState";

const useGetDaoBalance = (index?: number):QueryResult<DaoBalanceType> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["daoBalance", usedIndex], () => serviceInstance?.getDaoBalance());
};

export default useGetDaoBalance;
