import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

interface tokens {
    token: [];
}

export const useGetTokenPrice = (): QueryResult<tokens | undefined> =>
    useQuery(
        [Queries.TOKEN_PRICE],
        async () => {
            return await (await fetch("https://indexer.ref.finance/list-token-price")).json();
        },
        { refetchInterval: CONVERSION_PRICE_INTERVAL },
    );
