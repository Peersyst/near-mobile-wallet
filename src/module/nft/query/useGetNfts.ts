import { useQuery, UseQueryResult } from "react-query";
import useWalletState from "module/wallet/hook/useWalletState";
import { Nft } from "module/nft/types";

export default function (index?: number): UseQueryResult<Nft[]> {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["nfts", usedIndex], () => serviceInstance?.getNfts());
}
