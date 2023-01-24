import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const useGetDAOUnlockableAmounts = (index?: number): QueryResult<DAOUnlockableAmount[]> => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(["daoUnlockableAmounts", usedIndex, network], () => serviceInstance?.getDAOUnlockableAmounts() ?? [], {
        refetchInterval: 15000,
        enabled: queryEnabled,
    });
};

export default useGetDAOUnlockableAmounts;
