import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { CurrencyType } from "../hook/useCkbConversion";

export const useGetCkbPrice = (currency: CurrencyType): QueryResult<number> =>
    useQuery(
        ["ckPrice", currency],
        async () => {
            const res: any = await fetch("https://api.coingecko.com/api/v3/coins/nervos-network");
            const data = await res.json();
            return data?.market_data?.current_price[currency]
        },{}
    );


