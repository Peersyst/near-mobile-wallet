import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { LayoutAnimation } from "react-native";
import Select from "module/common/component/input/Select/Select";
import { SelectOption } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { LocaleType } from "locale";
import i18n from "locale/i18n";

const SelectLocale = (): JSX.Element => {
    const translate = useTranslate();
    const localeOptions: SelectOption<LocaleType>[] = [
        {
            label: translate("es"),
            value: "es",
        },
        {
            label: translate("en"),
            value: "en",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleSelect = async (value: LocaleType) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        i18n.changeLanguage(value);
        setSettings((s) => ({ ...s, locale: value }));
        await SettingsStorage.set({ locale: value });
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    return (
        <Select
            options={localeOptions}
            value={settings.locale}
            label={translate("select_locale")}
            onChange={(value) => handleSelect(value as LocaleType)}
        />
    );
};

export default SelectLocale;
