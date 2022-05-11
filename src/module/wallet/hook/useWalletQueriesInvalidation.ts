import { useQueryClient } from "react-query";

const useWalletQueriesInvalidation = (): ((index: number) => Promise<void>) => {
    const queryClient = useQueryClient();
    return async (index) => {
        await Promise.all([
            queryClient.invalidateQueries(["transactions", index], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["tokens", index], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["nfts", index], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["balance", index], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["daoBalance", index], { refetchInactive: true, exact: true }),
            queryClient.invalidateQueries(["daoUnlockableAmounts", index], { refetchInactive: true, exact: true }),
        ]);
    };
};

export default useWalletQueriesInvalidation;
