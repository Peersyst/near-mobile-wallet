import { useQueryClient } from "react-query";

const useWalletQueriesRemoval = (): ((index: number) => void) => {
    const queryClient = useQueryClient();
    return async (index) => {
        queryClient.removeQueries(["transactions", index], { exact: true });
        queryClient.removeQueries(["tokens", index], { exact: true });
        queryClient.removeQueries(["nfts", index], { exact: true });
        queryClient.removeQueries(["balance", index], { exact: true });
        queryClient.removeQueries(["daoBalance", index], { exact: true });
        queryClient.removeQueries(["daoUnlockableAmounts", index], { exact: true });
    };
};

export default useWalletQueriesRemoval;
