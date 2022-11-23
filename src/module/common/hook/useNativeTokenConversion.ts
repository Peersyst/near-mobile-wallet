import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetNativeTokenPrice } from "../query/useGetNativeTokenPrice";

export default function useNativeTokenConversion(currency: FiatCurrencyType, balance: number) {
    const { data = [] } = useGetNativeTokenPrice(currency);
    function convertBalance(balance: number): number {
        return typeof data === "number" ? data * balance : 0.01;
    }
    return { value: convertBalance(balance), convertBalance };
}
