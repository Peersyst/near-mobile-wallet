import { useQueryClient } from "react-query";

const useWalletQueriesRemoval = (): ((index: number) => void) => {
    const queryClient = useQueryClient();
    return async (index) => {
        queryClient.removeQueries(["transactions", index]);
        queryClient.removeQueries(["tokens", index]);
        queryClient.removeQueries(["nfts", index]);
        queryClient.removeQueries(["balance", index]);
        queryClient.removeQueries(["uncommittedTransactions", index]);
    };
};

export default useWalletQueriesRemoval;
