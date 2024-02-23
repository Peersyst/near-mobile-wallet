import { QueryResult } from "refactor/ui/common/query/react-query-overrides";
import { config } from "refactor/common/config";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetCoinPrice } from "./useGetCoinPrice";

export const useGetFiatPrice = (fiat?: FiatCurrencyType): QueryResult<number> => {
    return useGetCoinPrice(config.coingeckoUSDTApiId, fiat);
};
