import { LanguageDetectorAsyncModule } from "i18next";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import { Locale } from "refactor/common/models";

export async function detect(): Promise<Locale> {
    try {
        // <<< refactor
        return await ControllerFactory.settingsController?.getLocale();
        // refactor >>>
    } catch (error) {
        /* eslint-disable no-console */
        console.warn("Error reading language", error);
        return "en";
    }
}

const LanguageDetectorPlugin: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => {},
    detect,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cacheUserLanguage: () => {},
};

export default LanguageDetectorPlugin;
