import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { config } from "config";
import { useGetCoinPrice } from "./useGetCoinPrice";

export const useGetTokenPrice = (currency?: FiatCurrencyType): QueryResult<number> => {
    return useGetCoinPrice(config.coingeckoTokenApiId, currency);
};
