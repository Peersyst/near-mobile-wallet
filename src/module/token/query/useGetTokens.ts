import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { TokenAmount } from "../types";
import useWalletState from "module/wallet/hook/useWalletState";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = wallets[usedIndex].serviceInstance;
    return useQuery(["tokens", usedIndex], () => serviceInstance?.getTokensBalance());
};

export default useGetTokens;
