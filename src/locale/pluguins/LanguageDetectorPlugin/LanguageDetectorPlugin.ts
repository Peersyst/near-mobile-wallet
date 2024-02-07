/* eslint-disable @typescript-eslint/no-empty-function */
import { LanguageDetectorAsyncModule } from "i18next";

export async function detect(): Promise<any> {
    try {
        return "en";
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
