import { useQueryClient } from "react-query";
import { NetworkType } from "module/settings/state/SettingsState";

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
