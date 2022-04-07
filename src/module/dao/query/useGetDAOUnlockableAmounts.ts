import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import useWalletState from "module/wallet/hook/useWalletState";
import { DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";

const useGetDAOUnlockableAmounts = (): QueryResult<DAOUnlockableAmount[]> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    let usedIndex = 0;
    if (selectedWallet !== undefined) {
        usedIndex = selectedWallet < wallets.length ? selectedWallet : wallets.length - 1;
    }
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["daoUnlockableAmounts", usedIndex], () => serviceInstance?.getDAOUnlockableAmounts());
};

export default useGetDAOUnlockableAmounts;
