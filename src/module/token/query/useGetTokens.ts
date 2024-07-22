import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";
import Queries from "../../../query/queries";
import { config } from "config";
import { usePostHog } from "posthog-react-native";
import BigNumber from "bignumber.js";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const posthog = usePostHog();

    return useQuery(
        [Queries.GET_FTS, usedIndex, network],
        async (): Promise<Token[]> => {
            const accountTokens = await serviceInstance.getAccountTokens();

            const walletAddress = serviceInstance.getAddress();

            for (const token of accountTokens) {
                try {
                    posthog?.capture("load_wallet_tokens", {
                        wallet_address: walletAddress,
                        contract_id: token.contractId,
                        balance: BigNumber(token.balance).toNumber(),
                        chain: network,
                    });
                } catch (error) {}
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
