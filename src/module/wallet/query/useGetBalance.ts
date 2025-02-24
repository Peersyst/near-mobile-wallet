import Queries from "../../../query/queries";
import { useQuery, UseQueryOptions } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import { config } from "config";
import { AccountBalance } from "near-peersyst-sdk";

function useGetBalance<TData = AccountBalance>(
    index?: number,
    options: Omit<UseQueryOptions<AccountBalance, unknown, TData, any[]>, "queryFn" | "queryKey"> = {},
) {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);

    return useQuery(
        [Queries.GET_BALANCE, usedIndex, network],
        async () => {
            return await serviceInstance.getAccountBalance();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.balance,
            ...options,
        },
    );
}

export default useGetBalance;
