import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOUnlockableAmount } from "ckb-peersyst-sdk";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useGetDAOUnlockableAmounts = (index?: number): QueryResult<DAOUnlockableAmount[]> => {
    const { index: usedIndex, network, serviceInstance } = useGetServiceInstance(index);
    return useQuery(["daoUnlockableAmounts", usedIndex, network], () => serviceInstance.getDAOUnlockableAmounts() ?? [], {
        refetchInterval: 15000,
    });
};

export default useGetDAOUnlockableAmounts;
