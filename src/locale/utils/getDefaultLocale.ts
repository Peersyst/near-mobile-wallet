import * as Localization from "expo-localization";
import { LocaleType } from "locale/i18n.types";

//https://www.localeplanet.com/icu/iso3166.html
export function getDefaultLocale(): LocaleType {
    const systemLocale = Localization.locale.toLowerCase();

    if (systemLocale.includes("hant")) {
        return "zh-TW";
    } else if (systemLocale.includes("zh")) {
        return "zh-CN";
    }

    const locales: LocaleType[] = ["en", "es", "fr", "id", "it", "pt", "ru", "uk", "vi"];
    const systemLocaleEnd = systemLocale.slice(-2);
    const systemLocaleStart = systemLocale.slice(0, 2);
    return locales.find((l) => systemLocaleStart === l || systemLocaleEnd === l) ?? "en";
}
