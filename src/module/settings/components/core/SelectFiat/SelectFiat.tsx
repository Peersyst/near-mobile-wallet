import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FiatCurrencyType } from "module/settings/state/SettingsState";
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
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: FiatCurrencyType) => {
        setSettings((s) => ({ ...s, fiat: value }));
        SettingsStorage.set({ fiat: value });
    };
    return (
        <SelectGroup
            value={settings.fiat}
            onChange={(value) => handleSelect(value as FiatCurrencyType)}
            options={fiatOptions}
            label={translate("default_currency")}
        />
    );
};

export default SelectFiat;
