import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { TokenAmount } from "../types";
import useWalletState from "module/wallet/hook/useWalletState";
import { serviceInstancesMap } from "module/common/query/useLoad";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const {
        state: { selectedWallet },
    } = useWalletState();
    const usedIndex = index ?? selectedWallet ?? 0;
    const serviceInstance = serviceInstancesMap.get(usedIndex);
    return useQuery(["tokens", usedIndex], () => serviceInstance?.getTokensBalance());
};

export default useGetTokens;
