import { LocaleType, translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import i18n from "i18n-js";
import { LayoutAnimation } from "react-native";

const SelectLocale = (): JSX.Element => {
    const localeOptions: optionType[] = [
        {
            label: translate("es"),
            value: "es",
        },
        {
            label: translate("en"),
            value: "en",
        },
        {
            label: translate("zh"),
            value: "zh",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleSelect = async (value: LocaleType) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSettings((s) => ({ ...s, loading: true }));
        i18n.locale = value;
        await SettingsStorage.set({ locale: value });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTimeout(() => setSettings((s) => ({ ...s, locale: value, loading: false })), 1000);
    };
    return (
        <SelectGroup
            options={localeOptions}
            value={settings.locale}
            label={translate("select_locale")}
            onChange={(value) => handleSelect(value as LocaleType)}
        />
    );
};

export default SelectLocale;
