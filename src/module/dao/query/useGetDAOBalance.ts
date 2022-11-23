import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DAOBalance } from "ckb-peersyst-sdk";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const useGetDAOBalance = (index?: number): QueryResult<DAOBalance> => {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(
        ["daoBalance", usedIndex, network],
        () => {
            return serviceInstance?.getDAOBalance();
        },
        { refetchInterval: 15000 },
    );
};

export default useGetDAOBalance;
