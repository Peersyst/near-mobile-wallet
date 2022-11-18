import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { config } from "config";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

export const useGetNativeTokenPrice = (currency: FiatCurrencyType): QueryResult<number> =>
    useQuery(
        ["nativeTokenPrice", currency],
        async () => {
            const res: any = await fetch(`https://api.coingecko.com/api/v3/coins/${config.coingeckoTokenApiId}`);
            const data = await res.json();
            return data?.market_data?.current_price[currency];
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );
