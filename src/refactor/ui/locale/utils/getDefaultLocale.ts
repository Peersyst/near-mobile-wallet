import * as Localization from "expo-localization";
import { Locale } from "refactor/common/models";

//https://www.localeplanet.com/icu/iso3166.html
export function getDefaultLocale(): Locale {
    const systemLocale = Localization.locale.toLowerCase();

    if (systemLocale.includes("hant")) {
        return "zh-TW";
    } else if (systemLocale.includes("zh")) {
        return "zh-CN";
    }

    //Do not use `APP_LOCALES` from `src/locale/i18n.ts` as it wont't available in this context
    const locales: Locale[] = ["en", "es", "fr", "id", "it", "pt", "ru", "sw", "uk", "vi"];
    const parts = systemLocale.split("-");
    return locales.find((l) => parts.includes(l)) ?? "en";
}
