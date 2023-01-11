import { config } from "config";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "../query/useGetTokenPrice";

//balance has to be in NEAR
export default function useNativeTokenConversion(currency: FiatCurrencyType, balance: string | number) {
    const { data = 0 } = useGetTokenPrice(currency);

    function convertBalance(balance: string | number): string {
        return (Number(balance) * data).toFixed(config.maxNumberOfDecimals);
    }

    return { value: convertBalance(balance), convertBalance };
}
