import { QueryResult } from "refactor/ui/common/query/react-query-overrides";
import { config } from "refactor/common/config";
import { useGetCoinPrice } from "./useGetCoinPrice";
import { FiatCurrencyType } from "../types";

export const useGetNativeTokenPrice = (currency?: FiatCurrencyType): QueryResult<number> => {
    return useGetCoinPrice(config.coingeckoTokenApiId, currency);
};
