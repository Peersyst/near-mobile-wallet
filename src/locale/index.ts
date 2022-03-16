import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { SettingsStorage } from "module/settings/SettingsStorage";
import en from "./en.json";

export const loadLocalization = async () => {
    const storedLocale = await SettingsStorage.getLocale();
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: require("./en.json"),
        es: require("./es.json"),
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = storedLocale || Localization.locale || "en";
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
};

export const translate = (key: keyof typeof en): string => {
    return i18n.t(key);
};
