import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FiatCurrencyType } from "module/settings/state/SettingsState";
import { SettingsState } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectFiat = (): JSX.Element => {
    const fiatOptions: optionType[] = [
        {
            label: "USD",
            value: "usd",
        },
        {
            label: "EUR",
            value: "eur",
        },
        {
            label: "GBP",
            value: "gbp",
        },
        {
            label: "JPY",
            value: "jpy",
        },
        {
            label: "CNY",
            value: "cny",
        }
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: unknown) => {
        const newSettings: SettingsState = { ...settings, fiat: value as FiatCurrencyType };
        await SettingsStorage.set(newSettings);
        setSettings(newSettings);
    };
    return <SelectGroup value={settings.fiat} onChange={handleSelect} options={fiatOptions} label={translate("currency_conversion")} />;
};

export default SelectFiat;
