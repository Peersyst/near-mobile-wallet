import * as Localization from "expo-localization";
import { ILocalizationService } from "refactor/domain/adapter/service/ILocalizationService";

export default class LocalizationService implements ILocalizationService {
    /**
     * Return the user's locale.
     * Guaranteed to return a value.
     * @returns The user's locale.
     */
    getLocale(): string {
        const systemLocale = Localization.getLocales()[0]?.languageCode || Localization?.locale || "en";
        if (systemLocale.includes("hant")) {
            return "zh-TW";
        } else if (systemLocale.includes("zh")) {
            return "zh-CN";
        }
        return systemLocale;
    }
}
