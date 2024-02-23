import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SelectOption } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import { FiatCurrencyType } from "module/common/types";

const fiatOptions: SelectOption<FiatCurrencyType>[] = [
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
    {
        label: "RUB",
        value: "rub",
    },
    {
        label: "UAH",
        value: "uah",
    },
    {
        label: "IDR",
        value: "idr",
    },
];

const SelectFiat = (): JSX.Element => {
    const translate = useTranslate();

    const [settings, setSettings] = useRecoilState(settingsState);

    const handleSelect = (fiat: FiatCurrencyType) => {
        setSettings((s) => ({ ...s, fiat }));
        // <<< refactor
        ControllerFactory.settingsController.set({ fiat });
        // refactor >>>
    };

    return (
        <SettingsSelect
            value={settings.fiat}
            onChange={(value) => handleSelect(value)}
            options={fiatOptions}
            label={translate("default_currency")}
        />
    );
};

export default SelectFiat;
