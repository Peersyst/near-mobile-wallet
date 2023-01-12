import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { config } from "config";

export interface TokenPriceInfo {
    price: string;
    decimal: string;
    symbol: string;
}

export type TokenPrices = Record<string, TokenPriceInfo>;

export const useGetTokensPrice = (): QueryResult<TokenPrices | undefined> =>
    useQuery(
        [Queries.TOKENS_PRICE],
        async () => {
            return await (await fetch("https://indexer.ref.finance/list-token-price")).json();
        },
        { refetchInterval: config.fetchPriceConversionInterval },
    );
