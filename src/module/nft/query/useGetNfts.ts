import { useQuery, UseQueryResult } from "react-query";
import { NftToken } from "near-peersyst-sdk";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "config";
import { usePostHog } from "posthog-react-native";

export default function (index?: number): UseQueryResult<NftToken[]> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    const posthog = usePostHog();

    return useQuery(
        [Queries.GET_NFTS, usedIndex, network],
        async (): Promise<NftToken[]> => {
            const nfts = await serviceInstance.getNfts();

            try {
                posthog?.capture("load_wallet_nfts", {
                    wallet_address: serviceInstance.getAddress(),
                    nft_count: nfts.length,
                    chain: network,
                });
            } catch (error) {}

            return nfts;
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.nfts,
        },
    );
}
