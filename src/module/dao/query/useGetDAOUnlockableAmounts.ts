import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOUnlockableAmount } from "module/common/service/mock/CkbServiceMock.types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetDAOUnlockableAmounts = (index?: number): QueryResult<DAOUnlockableAmount[]> => {
    const selectedWalletIndex = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWalletIndex;
    return useQuery(["daoUnlockableAmounts", usedIndex], () => serviceInstancesMap.get(usedIndex)!.getDAOUnlockableAmounts() ?? []);
};

export default useGetDAOUnlockableAmounts;
