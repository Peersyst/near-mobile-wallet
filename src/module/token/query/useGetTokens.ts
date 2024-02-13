import { QueryResult } from "refactor/ui/common/query/react-query-overrides";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";
import Queries from "../../../refactor/ui/common/query/queries";
import { config } from "refactor/common/config";

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
