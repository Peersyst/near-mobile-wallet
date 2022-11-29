import { useQuery, UseQueryResult } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { NftToken } from "near-peersyst-sdk";

export default function (index?: number): UseQueryResult<NftToken[]> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(
        ["nfts", usedIndex, network],
        async (): Promise<NftToken[]> => {
            return await serviceInstance.getNfts();
        },
        {
            enabled: false, //TODO: enable when nfts are ready
        },
    );
}
