import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";
import Queries from "../../../query/queries";
import { config } from "config";
import { usePostHog } from "posthog-react-native";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const posthog = usePostHog();

    return useQuery(
        [Queries.GET_FTS, usedIndex, network],
        async (): Promise<Token[]> => {
            const accountTokens = await serviceInstance.getAccountTokens();

            const walletAddress = serviceInstance.getAddress();

            for (const token of accountTokens) {
                posthog?.capture("load_wallet_tokens", {
                    wallet_address: walletAddress,
                    contract_id: token.contractId,
                    balance: token.balance,
                    chain: network,
                });
            }

            return accountTokens;
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.tokens,
        },
    );
};

export default useGetTokens;
