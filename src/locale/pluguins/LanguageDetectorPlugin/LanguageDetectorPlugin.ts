import { SettingsStorage } from "module/settings/SettingsStorage";
import { LanguageDetectorAsyncModule } from "i18next";
import { LocaleType } from "locale";
import { getDefaultLocale } from "locale/utils/getDefaultLocale";

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
