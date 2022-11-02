import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOBalance } from "ckb-peersyst-sdk";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const { index: usedIndex, network, serviceInstance } = useGetServiceInstance(index);
    return useQuery(
        ["daoBalance", usedIndex, network],
        () => {
            return serviceInstance?.getDAOBalance();
        },
        { refetchInterval: 15000 },
    );
};

export default useGetDAOBalance;
