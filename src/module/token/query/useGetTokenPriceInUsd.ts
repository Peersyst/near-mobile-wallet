import { QueryResult } from "query-utils";
import { TokenPrices, useGetTokensPrice } from "./useGetTokensPrice";

export interface GetTokenPriceReturn {
    data: string | undefined;
}

export interface UseGetTokenPriceInUsdReturn extends Omit<QueryResult<string | undefined>, "refetch"> {
    refetch: () => Promise<GetTokenPriceReturn>;
}

export default function useGetTokenPriceInUsd(contractId?: string): UseGetTokenPriceInUsdReturn {
    const { data, refetch, ...rest } = useGetTokensPrice();
    function getPriceFromContract(prices?: TokenPrices) {
        if (!contractId) return undefined;
        return prices?.[contractId]?.price;
    }
    async function handleRefetch() {
        const { data } = await refetch();
        return {
            data: getPriceFromContract(data),
        };
    }
    return {
        data: getPriceFromContract(data),
        refetch: handleRefetch,
        ...rest,
    };
}
