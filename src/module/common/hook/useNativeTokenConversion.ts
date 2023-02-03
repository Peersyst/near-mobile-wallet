import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetNativeTokenPrice } from "../query/useGetNativeTokenPrice";

//balance has to be in NEAR
export default function useNativeTokenConversion(balance: string | number, currency?: FiatCurrencyType) {
    const { data = 0 } = useGetNativeTokenPrice(currency);

    function convertBalance(balance: string | number): string {
        return (Number(balance) * data).toString();
    }

    return { value: convertBalance(balance), convertBalance };
}
