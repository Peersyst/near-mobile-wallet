import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { TokenAmount } from "../types";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["tokens", usedIndex], () => serviceInstance?.getTokensBalance());
};

export default useGetTokens;
