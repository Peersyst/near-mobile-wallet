import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "config";
import { IntentsTokenBalance } from "near-peersyst-sdk";
import { useConfig } from "@peersyst/react-native-components";

const useGetIntentsTokenBalances = (index?: number): QueryResult<IntentsTokenBalance[]> => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const { enabled: intentsEnabled } = useConfig("intents");

    return useQuery(
        [Queries.GET_INTENTS, usedIndex, network, intentsEnabled],
        async (): Promise<IntentsTokenBalance[]> => {
            return await serviceInstance.getIntentsTokenBalances();
        },
        {
            enabled: queryEnabled && network === "mainnet" && intentsEnabled,
            refetchInterval: config.refetchIntervals.tokens,
        },
    );
};

export default useGetIntentsTokenBalances;
