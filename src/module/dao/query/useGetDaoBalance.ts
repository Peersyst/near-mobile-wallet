import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import useWalletState from "module/wallet/hook/useWalletState";
import { DAOBalance } from "module/common/service/mock/CkbServiceMock.types";

const useGetDaoBalance = (index?: number):QueryResult<DAOBalance> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["daoBalance", usedIndex], () => serviceInstance?.getDaoBalance());
};

export default useGetDaoBalance;
