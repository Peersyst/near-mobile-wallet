import { BalanceOperations } from "near-peersyst-sdk";
import { useGetNativeTokenPrice } from "../query/useGetNativeTokenPrice";
import { FiatCurrencyType } from "../types";

//balance has to be in NEAR
export default function useNativeTokenConversion(balance: string | number, currency?: FiatCurrencyType) {
    const { data = 0 } = useGetNativeTokenPrice(currency);

    function convertBalance(balance: string | number): string {
        return BalanceOperations.multiply(balance, data);
    }

    return { value: convertBalance(balance), convertBalance };
}
