import { QueryResult } from "refactor/ui/common/query/react-query-overrides";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { config } from "refactor/common/config";
import { useGetCoinPrice } from "./useGetCoinPrice";

export const useGetNativeTokenPrice = (currency?: FiatCurrencyType): QueryResult<number> => {
    return useGetCoinPrice(config.coingeckoTokenApiId, currency);
};
