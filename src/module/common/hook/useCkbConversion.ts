import { useGetCkbPrice } from "../query/useCkbPriceConverter";

export type CurrencyType = "btc" | "usd" | "eur";

export default function useCkbConversion(currency: CurrencyType, balance: number) {
    const { data = [] } = useGetCkbPrice(currency);
    function convertBalance(balance: number): number {
        return typeof data === "number" ? data * balance : 0.01;
    }
    return { value: convertBalance(balance), convertBalance };
}
