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
    ["melania-meme"]: "MELANIA",
    ["berachain-bera"]: "BERA",
    ["aurora-near"]: "AURORA",
    ["shiba-inu"]: "SHIB",
    gmx: "GMX",
    ["mog-coin"]: "MOG",
    ["based-brett"]: "BRETT",
    sweatcoin: "SWEAT",
    turbo: "TURBO",
    dogwifcoin: "WIF",
    ["book-of-meme"]: "BOME",
    ["black-dragon"]: "BLACKDRAGON",
    shitzu: "SHITZU",
    ["forgive-me-father"]: "PURGE",
    burrow: "BRRR",
    gnosis: "GNO",
    ["cow-protocol"]: "COW",
    safe: "SAFE",
};

const IDS = Object.keys(tokenMap).join(",");

export function useGetExchangePrice<TData = ExchangePrice>(
    options: Omit<UseQueryOptions<ExchangePrice, unknown, TData, Queries[]>, "queryFn" | "queryKey"> = {},
    ids = IDS, // comma separated list of ids
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
