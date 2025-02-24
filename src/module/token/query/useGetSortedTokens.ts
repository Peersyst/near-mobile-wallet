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
import BigNumber from "bignumber.js";

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
    const { data: tokenPrices = {} } = useGetExchangePrice();
    const { data: refTokenPrices = {} } = useGetTokensPrice();

    // Sort tokens by price
    const sortedTokens = useMemo(() => {
        const mixedTokens = [...intentsTokens, ...tokens];
        const tokensWithPrice = mixedTokens.map((token) => {
            let price = 0;
            let fiatBalance = "0";

            if ("totalBalance" in token) {
                price = tokenPrices?.[token.symbol] || 0;
                const formattedValue = formatTokenAmount(token.totalBalance || "0", token.decimals.toString());
                fiatBalance = new BigNumber(formattedValue).multipliedBy(price).toFixed(3);
            } else if (token.contractId) {
                price = Number(refTokenPrices[token.contractId]?.price || 0);
                fiatBalance = new BigNumber(token.balance).multipliedBy(price).toFixed(3);
            } else {
                // eslint-disable-next-line no-console
                console.error("Token without price", token);
            }
            return { ...token, price, fiatBalance };
        });

        return tokensWithPrice.sort((a, b) => new BigNumber(b.fiatBalance).minus(a.fiatBalance).toNumber());
    }, [intentsTokens, tokens, tokenPrices, refTokenPrices]);

    const handleRefetch = useCallback(async () => {
        await Promise.allSettled([refetchTokens(), refetchIntentsTokens()]);
    }, []);

    const isIdleIntents = isIdleIntentsTokens && network === "mainnet" && intentsEnabled;

    return {
        tokens: sortedTokens,
        isIdle: isIdleTokens || isIdleIntents,
        isLoading: isLoadingTokens || isLoadingIntentsTokens,
        refetch: handleRefetch,
    };
}
