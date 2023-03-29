import { SettingsStorage } from "module/settings/SettingsStorage";
import { LanguageDetectorAsyncModule } from "i18next";
import * as Localization from "expo-localization";
import { LocaleType } from "locale";

//https://www.localeplanet.com/icu/iso3166.html
export function getDefaultLocale(): LocaleType {
    const locales: LocaleType[] = ["en", "es"];
    const systemLocaleEnd = Localization.locale.slice(-2).toLowerCase();
    const systemLocaleStart = Localization.locale.slice(0, 2).toLowerCase();
    return locales.find((l) => systemLocaleStart === l || systemLocaleEnd === l) ?? "en";
}

export async function detect(): Promise<LocaleType> {
    try {
        const storedLocale = await SettingsStorage?.getLocale();
        return storedLocale || getDefaultLocale();
    } catch (error) {
        /* eslint-disable no-console */
        console.warn("Error reading language", error);
        return "en";
    }
}

const LanguageDetectorPlugin: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    /* eslint-disable @typescript-eslint/no-empty-function */
    init: () => {},
    detect: async function (callback: (lang: string) => void) {
        try {
            callback(await detect());
        } catch (error) {
            /* eslint-disable no-console */
            console.log("Error reading language", error);
        }
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;
