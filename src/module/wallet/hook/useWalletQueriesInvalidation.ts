import { NetworkType } from "module/common/types";
import { useQueryClient } from "react-query";

const useWalletQueriesInvalidation = (): ((index: number, chain: NetworkType) => Promise<void>) => {
    const queryClient = useQueryClient();
    return async (index, chain) => {
        await Promise.all([
            queryClient.invalidateQueries(["transactions", index, chain], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["tokens", index, chain], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["nfts", index, chain], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["balance", index, chain], { refetchInactive: true, exact: true }),
        ]);
    };
};

export default useWalletQueriesInvalidation;
