import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { ApiIdType } from "../types";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

export const useGetTokenPrice = (currency: FiatCurrencyType, type: ApiIdType): QueryResult<number | undefined> =>
    useQuery(
        ["tokenPrice", currency, type],
        async () => {
            const apiId = type; //TODO: implement this for other tokens
            if (apiId) {
                const res: any = await fetch(`https://api.coingecko.com/api/v3/coins/${apiId}`);
                const data = await res.json();

                return data?.market_data?.current_price[currency];
            } else return undefined;
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );
