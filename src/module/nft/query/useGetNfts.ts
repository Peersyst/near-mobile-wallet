import { useQuery, UseQueryResult } from "react-query";
import { NftToken } from "near-peersyst-sdk";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import Queries from "../../../query/queries";
import { config } from "config";

export default function (index?: number): UseQueryResult<NftToken[]> {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery(
        [Queries.GET_NFTS, usedIndex, network],
        async (): Promise<NftToken[]> => {
            return await serviceInstance.getNfts();
        },
        {
            enabled: queryEnabled,
            refetchInterval: config.refetchIntervals.nfts,
        },
    );
}
