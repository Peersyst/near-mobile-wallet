import useGetNfts from "module/nft/query/useGetNfts";
import useGetTokens from "module/token/query/useGetTokens";
import { AccountBalance, NftToken, Token } from "near-peersyst-sdk";
import useGetBalance from "./useGetBalance";

export type UseGetAllAssets = (index?: number) => {
    isLoading: boolean;
    nfts: NftToken[] | undefined;
    tokens: Token[] | undefined;
    balance: AccountBalance | undefined;
};

export const useGetAllAssets: UseGetAllAssets = (index) => {
    const { isLoading: isNftsLoading, data: nfts } = useGetNfts(index);
    const { isLoading: isTokensLoading, data: tokens } = useGetTokens(index);
    const { isLoading: isBalanceLoading, data: balance } = useGetBalance(index);
    const isLoading = isNftsLoading || isTokensLoading || isBalanceLoading;
    return { isLoading, nfts, tokens, balance };
};
