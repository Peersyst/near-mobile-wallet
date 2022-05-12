import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetCkbPrice } from "../query/useGetCkbPrice";

export default function useCkbConversion(currency: FiatCurrencyType, balance: number) {
    const { data = [] } = useGetCkbPrice(currency);
    function convertBalance(balance: number): number {
        return typeof data === "number" ? data * balance : 0.01;
    }
    return { value: convertBalance(balance), convertBalance };
}
