import { useQuery, UseQueryOptions } from "react-query";
import { config } from "config";
import Queries from "../../../query/queries";

export type CoingeckoPrice = {
    id: string;
    symbol: string;
    current_price: number;
    // And more ...
};

export type ExchangePrice = Record<string, number>;

export function useGetExchangePrice<TData = ExchangePrice>(
    options: Omit<UseQueryOptions<ExchangePrice, unknown, TData, Queries[]>, "queryFn" | "queryKey"> = {},
) {
    return useQuery(
        [Queries.EXCHANGE_PRICE],
        async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`);
                const data: CoingeckoPrice[] = await res.json();
                let result: ExchangePrice = {};

                for (const tokenPrice of data) {
                    result[tokenPrice.symbol.toUpperCase()] = tokenPrice.current_price;
                }
                return result;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn("Error loading coingecko price", JSON.stringify(e));
                return {};
            }
        },
        {
            refetchInterval: config.refetchIntervals.fiatPrice,
            ...options,
        },
    );
}
