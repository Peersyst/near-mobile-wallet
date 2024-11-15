import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import { config } from "config";

const useGetBalance = (index?: number) => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);

    return useQuery(
        [Queries.GET_BALANCE, usedIndex, network],
        async () => {
            return await serviceInstance.getAccountBalance();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.balance,
        },
    );
};

export default useGetBalance;
