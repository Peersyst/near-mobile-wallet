import { useQuery, UseQueryResult } from "react-query";
import { Nft } from "module/nft/types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

export default function (index?: number): UseQueryResult<Nft[]> {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["nfts", usedIndex, network], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex)?.[network];
        return serviceInstance?.getNfts();
    });
}
