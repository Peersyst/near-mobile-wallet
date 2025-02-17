import { useGetExchangePrice } from "./useGetExchangePrice";

export const useGetCoinPriceByTicker = (tickerParam: string) => {
    return useGetExchangePrice({ select: (data) => data[tickerParam] });
};
