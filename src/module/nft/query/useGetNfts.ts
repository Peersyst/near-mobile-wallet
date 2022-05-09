import { useQuery, UseQueryResult } from "react-query";
import { Nft } from "module/nft/types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

export default function (index?: number): UseQueryResult<Nft[]> {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["nfts", usedIndex], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex);
        return serviceInstance?.getNfts();
    });
}
