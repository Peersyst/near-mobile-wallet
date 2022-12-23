import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

interface tokens {
    token: [];
}

export const useGetTokenPrice = (currency: FiatCurrencyType): QueryResult<tokens | undefined> =>
    useQuery(
        ["tokenPrice", currency],
        async () => {
            return await (await fetch("https://indexer.ref.finance/list-token-price")).json();
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );
