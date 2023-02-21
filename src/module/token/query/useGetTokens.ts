import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";
import Queries from "../../../query/queries";
import { config } from "config";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.GET_FTS, usedIndex, network],
        async (): Promise<Token[]> => {
            return await serviceInstance.getAccountTokens();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.tokens,
        },
    );
};

export default useGetTokens;
