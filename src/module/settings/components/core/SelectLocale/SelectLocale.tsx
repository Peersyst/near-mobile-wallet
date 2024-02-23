import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import useTranslate from "module/common/hook/useTranslate";
import { LocaleResourceType, LocaleType } from "refactor/ui/locale";
import i18n, { APP_LOCALES } from "refactor/ui/locale/i18n";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { useMemo } from "react";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

const SelectLocale = (): JSX.Element => {
    const translateLang = useTranslate("langs");
    const translate = useTranslate();

    const localeOptions = useMemo(() => {
        return APP_LOCALES.map((locale) => {
            return {
                label: translateLang(locale as LocaleResourceType),
                value: locale,
            };
        });
    }, []);
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleSelect = (value: LocaleType) => {
        i18n.changeLanguage(value);
        setSettings((s) => ({ ...s, locale: value }));
        // <<< refactor
        ControllerFactory.settingsController.set({ locale: value });
        // refactor >>>
    };
    return (
        <SettingsSelect
            options={localeOptions}
            value={settings.locale}
            label={translate("select_locale")}
            onChange={(value) => handleSelect(value)}
        />
    );
};

export default SelectLocale;
