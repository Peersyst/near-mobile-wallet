import * as Localization from "expo-localization";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { LanguageDetectorAsyncModule } from "i18next";
import { LocaleType } from "locale";

export function getDefaultLocale(): LocaleType {
    const locales: LocaleType[] = ["en", "es"];
    const systemLocaleEnd = Localization.locale.slice(-2).toLowerCase();
    const systemLocaleStart = Localization.locale.slice(0, 2).toLowerCase();
    return locales.find((l) => systemLocaleStart === l || systemLocaleEnd === l) ?? "en";
}

export async function initLang(): Promise<LocaleType> {
    const storedLocale = await SettingsStorage?.getLocale();
    return storedLocale || getDefaultLocale();
}

const LanguageDetectorPlugin: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    /* eslint-disable @typescript-eslint/no-empty-function */
    init: () => {},
    detect: async function (callback: (lang: string) => void) {
        try {
            callback(await initLang());
        } catch (error) {
            /* eslint-disable no-console */
            console.log("Error reading language", error);
        }
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;
