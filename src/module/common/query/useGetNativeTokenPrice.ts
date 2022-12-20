import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import settingsState, { FiatCurrencyType } from "module/settings/state/SettingsState";
import { config } from "config";
import { useRecoilValue } from "recoil";

export const useGetNativeTokenPrice = (currency?: FiatCurrencyType): QueryResult<number> => {
    const { fiat } = useRecoilValue(settingsState);
    const finalCurrency = currency || fiat;
    return useQuery(
        ["nativeTokenPrice", finalCurrency],
        async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${config.coingeckoTokenApiId}`);
                const data = await res.json();
                return data?.market_data?.current_price[finalCurrency];
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn("Error loading token price", e);
                return 0;
            }
        },
        {
            refetchInterval: config.fetchPriceConversionInterval,
        },
    );
};
