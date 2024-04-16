/* eslint-disable @typescript-eslint/no-empty-function */
import { LanguageDetectorAsyncModule } from "i18next";
import { getDefaultLocale } from "locale/utils";
import { SettingsStorage } from "module/settings/SettingsStorage";

export async function detect(): Promise<any> {
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
    init: () => {},
    detect,
    cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;
