import { useQuery, UseQueryResult } from "react-query";
import { NftToken } from "near-peersyst-sdk";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export default function (index?: number): UseQueryResult<NftToken[]> {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(["nfts", usedIndex, network], async (): Promise<NftToken[]> => {
        return await serviceInstance.getNfts();
    });
}
