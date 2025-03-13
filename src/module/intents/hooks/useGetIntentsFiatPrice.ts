import { useGetExchangePrice } from "module/common/query/useGetExchangePrice";
import { useGetFiatPrice } from "module/common/query/useGetFiatPrice";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokensPrice } from "module/token/query/useGetTokensPrice";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IntentsTokenBalance } from "near-peersyst-sdk";
import BigNumber from "bignumber.js";

export type UseGetIntentsPriceReturn = {
    getIntentsFiatPrice: (token: IntentsTokenBalance) => string | undefined;
    isLoading: boolean;
};

export function useGetIntentsFiatPrice(): UseGetIntentsPriceReturn {
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenPrices } = useGetExchangePrice();
    const { data: refTokenPrices = {} } = useGetTokensPrice();
    const { data: fiatPrice, isLoading: isFiatLoading } = useGetFiatPrice(fiat);

    const getIntentsFiatPrice = useCallback(
        (token: IntentsTokenBalance) => {
            let tokenPrice = tokenPrices?.[token.symbol];
            if (!tokenPrice) {
                // try to find the price by contractId
                for (const groupedToken of token.groupedTokens) {
                    const refTokenPrice = refTokenPrices[groupedToken.defuseAssetId.split("nep141:")[1]];
                    if (refTokenPrice) {
                        tokenPrice = Number(refTokenPrice.price || 0);
                        break;
                    }
                }
            }
            return getTokenPrice(tokenPrice, fiatPrice);
        },
        [tokenPrices, fiatPrice, refTokenPrices],
    );

    return {
        getIntentsFiatPrice,
        isLoading: isFiatLoading,
    };
}

function getTokenPrice(tokenPrice: number | undefined, fiatPrice: number | undefined) {
    try {
        const finalTokenPrice = Number(tokenPrice);
        const finalFiatPrice = Number(fiatPrice);
        if (tokenPrice && !isNaN(finalFiatPrice) && fiatPrice && !isNaN(finalTokenPrice)) {
            return new BigNumber(tokenPrice).multipliedBy(fiatPrice).toFixed(24);
        }
    } catch (e) {
        return undefined;
    }
}
