import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

export const useGetTokenPrice = (currency: FiatCurrencyType, type: string): QueryResult<number | undefined> =>
    useQuery(
        ["tokenPrice", currency, type],
        async () => {
            const apiId = type; //TODO: implement this for other tokens
            if (apiId) {
                const prices = await (await fetch("https://indexer.ref.finance/list-token-price")).json();
                return prices[type] ? prices[type]["price"] : 0;
            } else return undefined;
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );
