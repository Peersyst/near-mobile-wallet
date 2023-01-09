import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import Queries from "../../../query/queries";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

interface tokens {
    token: [];
}

export const useGetTokenPrice = (currency: FiatCurrencyType): QueryResult<tokens | undefined> =>
    useQuery(
        [Queries.TOKEN_PRICE, currency],
        async () => {
            return await (await fetch("https://indexer.ref.finance/list-token-price")).json();
        },
        { enabled: !!currency, refetchInterval: CONVERSION_PRICE_INTERVAL },
    );
