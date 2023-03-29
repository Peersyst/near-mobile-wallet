import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { config } from "config";
import Queries from "../../../query/queries";
import { useRecoilValue } from "recoil";
import settingsState, { FiatCurrencyType } from "module/settings/state/SettingsState";

export type CoinPrice = Record<string, number>;

export const useGetCoinPrice = (apiId?: string, fiatParam?: FiatCurrencyType): QueryResult<number> => {
    const { fiat } = useRecoilValue(settingsState);
    const finalCurrency = fiatParam || fiat;
    return useQuery(
        [Queries.COIN_PRICE, apiId, finalCurrency],
        async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${apiId}`);
                const data = await res.json();
                return data?.market_data?.current_price[finalCurrency];
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn("Error loading coingecko price", JSON.stringify(e));
                return 0;
            }
        },
        {
            refetchInterval: config.refetchIntervals.fiatPrice,
        },
    );
};
