import { useGetFiatPrice } from "module/common/query/useGetFiatPrice";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import useGetTokenPriceInUsd from "../query/useGetTokenPriceInUsd";

export interface UseGetTokenPriceReturn {
    price: number | undefined;
}

export function useGetTokenPrice(contractId?: string, fiat?: FiatCurrencyType): UseGetTokenPriceReturn {
    const { data: fiatPrice, isLoading: isFiatLoading } = useGetFiatPrice(fiat);
    const { data: tokenPrice, isLoading: isPriceInUsdLoading } = useGetTokenPriceInUsd(contractId);
    const isLoading = isFiatLoading || isPriceInUsdLoading;

    function getTokenPrice() {
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

    return {
        price: isLoading ? undefined : getTokenPrice(),
    };
}
