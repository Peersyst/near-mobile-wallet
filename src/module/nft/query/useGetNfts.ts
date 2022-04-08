import { useQuery, UseQueryResult } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { Nft } from "module/nft/types";
import { serviceInstancesMap } from "module/common/query/useLoad";

export default function (index?: number): UseQueryResult<Nft[]> {
    const {
        state: { selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["nfts", usedIndex], () => serviceInstance?.getNfts());
}
