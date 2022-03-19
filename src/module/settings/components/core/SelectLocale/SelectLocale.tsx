import { LocaleType, translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { NetworkType, SettingsState } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectLocale = (): JSX.Element => {
    const localeOptions: optionType[] = [
        {
            label: translate("es"),
            value: "en",
        },
        {
            label: translate("en"),
            value: "es",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: unknown) => {
        const newSettings: SettingsState = { ...settings, locale: value as LocaleType };
        await SettingsStorage.set(newSettings);
        setSettings(newSettings);
    };
    return <SelectGroup options={localeOptions} value={settings.locale} label={translate("select_locale")} onChange={handleSelect} />;
};

export default SelectLocale;