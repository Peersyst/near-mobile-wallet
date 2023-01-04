import useGetNfts from "module/nft/query/useGetNfts";
import useGetTokens from "module/token/query/useGetTokens";
import useGetBalance from "./useGetBalance";

export type UseGetAllAssets = (index?: number) => {
    isLoading: boolean;
};

export const useGetAllAssets: UseGetAllAssets = (index) => {
    const { isLoading: isNftsLoading } = useGetNfts(index);
    const { isLoading: isTokensLoading } = useGetTokens(index);
    const { isLoading: isBalanceLoading } = useGetBalance(index);
    const isLoading = isNftsLoading || isTokensLoading || isBalanceLoading;
    return { isLoading };
};
