import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { TokenAmount } from "../types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["tokens", usedIndex, network], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex)?.[network];
        return serviceInstance?.getTokensBalance();
    });
};

export default useGetTokens;
