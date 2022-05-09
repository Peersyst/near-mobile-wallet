import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { TokenAmount } from "../types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    return useQuery(["tokens", usedIndex], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex);
        return serviceInstance?.getTokensBalance();
    });
};

export default useGetTokens;
