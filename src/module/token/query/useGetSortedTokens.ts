import useGetIntentsTokenBalances from "module/intents/query/useGetIntentsBalance";
import useWalletState from "module/wallet/hook/useWalletState";
import useGetTokens from "./useGetTokens";
import { useGetExchangePrice } from "module/common/query/useGetExchangePrice";
import { useGetTokensPrice } from "./useGetTokensPrice";
import { useCallback, useMemo } from "react";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { formatTokenAmount } from "near-peersyst-sdk";
import { useConfig } from "@peersyst/react-native-components";

export function useGetSortedTokens() {
    const {
        state: { selectedWallet },
    } = useWalletState();
    const { isIdle: isIdleTokens, isLoading: isLoadingTokens, data: tokens = [], refetch: refetchTokens } = useGetTokens(selectedWallet);
    const {
        isIdle: isIdleIntentsTokens,
        isLoading: isLoadingIntentsTokens,
        data: intentsTokens = [],
        refetch: refetchIntentsTokens,
    } = useGetIntentsTokenBalances(selectedWallet);
    const { network } = useRecoilValue(settingsState);
    const { enabled: intentsEnabled } = useConfig("intents");
    // Price hooks
    const { data: tokenPrices = {}, refetch: refetchExchangePrice } = useGetExchangePrice();
    const { data: refTokenPrices = {}, refetch: refetchRefPrice } = useGetTokensPrice();

    const mixedTokens = useMemo(() => [...intentsTokens, ...tokens], [intentsTokens, tokens]);
    // Sort tokens by price
    const sortedTokens = useMemo(() => {
        const tokensWithPrice = mixedTokens.map((token) => {
            let price = 0;
            let fiatBalance = 0;
            if ("totalBalance" in token) {
                price = tokenPrices?.[token.symbol] || 0;
                const formattedValue = formatTokenAmount(token.totalBalance || "0", token.decimals.toString());
                fiatBalance = Number(formattedValue) * price;
            } else if (token.contractId) {
                price = Number(refTokenPrices[token.contractId]?.price || 0);
                const formattedValue = formatTokenAmount(token.balance || "0", token.metadata.decimals.toString());
                fiatBalance = Number(formattedValue) * price;
            }
            return { ...token, price, fiatBalance };
        });

        return tokensWithPrice.sort((a, b) => b.fiatBalance - a.fiatBalance);
    }, [mixedTokens, tokenPrices, refTokenPrices]);

    const handleRefetch = useCallback(async () => {
        await Promise.allSettled([refetchTokens(), refetchRefPrice(), refetchIntentsTokens(), refetchExchangePrice()]);
    }, []);

    const isIdleIntents = isIdleIntentsTokens && network === "mainnet" && intentsEnabled;

    return {
        tokens: sortedTokens,
        isIdle: isIdleTokens || isIdleIntents,
        isLoading: isLoadingTokens || isLoadingIntentsTokens,
        refetch: handleRefetch,
    };
}
