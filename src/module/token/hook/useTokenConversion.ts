import { config } from "refactor/common/config";
import { useGetTokenPrice } from "./useGetTokenPrice";
import { FiatCurrencyType } from "module/common/types";

export interface UseNativeTokenConversionReturn {
    value: string | undefined;
    convertBalance: (balance: string | number) => string | undefined;
}

export default function useTokenConversion(balance: string | number, contractId?: string, fiat?: FiatCurrencyType) {
    const { price } = useGetTokenPrice(contractId, fiat);

    function convertBalance(balance: string | number): string | undefined {
        if (price === undefined) return undefined;
        return (Number(balance) * price).toFixed(config.maxNumberOfDecimals);
    }

    return { value: convertBalance(balance), convertBalance };
}
