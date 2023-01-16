import { QueryResult } from "query-utils";
import { config } from "config";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetCoinPrice } from "./useGetCoinPrice";

export const useGetFiatPrice = (fiat?: FiatCurrencyType): QueryResult<number> => {
    return useGetCoinPrice(config.coingeckoUSDTApiId, fiat);
};
