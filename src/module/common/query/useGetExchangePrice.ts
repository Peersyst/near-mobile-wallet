import { useQuery, UseQueryOptions } from "react-query";
import { config } from "config";
import Queries from "../../../query/queries";

export type CoingeckoPrice = {
    id: string;
    symbol: string;
    current_price: number;
    // And more ...
};

export type CoinPriceById = Record<string, { usd: number }>;

export type ExchangePrice = Record<string, number>;

const tokenMap: Record<string, string> = {
    zcash: "ZEC",
};

export function useGetExchangePrice<TData = ExchangePrice>(
    ids = "zcash", // comma separated list of ids
    options: Omit<UseQueryOptions<ExchangePrice, unknown, TData, Queries[]>, "queryFn" | "queryKey"> = {},
) {
    return useQuery(
        [Queries.EXCHANGE_PRICE],
        async () => {
            try {
                const [res, altRes] = await Promise.all([
                    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`),
                    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`),
                ]);

                const data: CoingeckoPrice[] = await res.json();
                const result: ExchangePrice = {};

                for (const tokenPrice of data) {
                    result[tokenPrice.symbol.toUpperCase()] = tokenPrice.current_price;
                }

                const altData: CoinPriceById = await altRes.json();

                for (const tokenName of Object.keys(altData)) {
                    const token = tokenMap[tokenName];
                    if (token && !result[token]) {
                        result[token] = altData[tokenName].usd;
                    }
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
