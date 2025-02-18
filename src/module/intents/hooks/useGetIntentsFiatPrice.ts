import { useGetExchangePrice } from "module/common/query/useGetExchangePrice";
import { useGetFiatPrice } from "module/common/query/useGetFiatPrice";
import settingsState from "module/settings/state/SettingsState";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

export type UseGetIntentsPriceReturn = {
    getIntentsFiatPrice: (symbol: string) => number | undefined;
    isLoading: boolean;
};

export function useGetIntentsFiatPrice(): UseGetIntentsPriceReturn {
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenPrices } = useGetExchangePrice();
    const { data: fiatPrice, isLoading: isFiatLoading } = useGetFiatPrice(fiat);

    const getIntentsFiatPrice = useCallback(
        (tokenSymbol: string) => {
            const tokenPrice = tokenPrices?.[tokenSymbol];
            return getTokenPrice(tokenPrice, fiatPrice);
        },
        [tokenPrices, fiatPrice],
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
        if (!isNaN(finalFiatPrice) && !isNaN(finalTokenPrice)) {
            return finalFiatPrice * finalTokenPrice;
        }
    } catch (e) {
        return undefined;
    }
}
