import { useQuery, UseQueryResult } from "react-query";
import { Nft } from "module/nft/types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

export default function (index?: number): UseQueryResult<Nft[]> {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["nfts", usedIndex], () => serviceInstance?.getNfts());
}
