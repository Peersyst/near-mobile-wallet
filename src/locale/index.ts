import i18n from "i18n-js";
import en from "./en.json";
import { SettingsStorage } from "module/settings/SettingsStorage";
import getDefaultLocale from "./utils/getDefaultLocale";
export type LocaleType = "en" | "es";

export async function initLang(): Promise<LocaleType> {
    const storedLocale = await SettingsStorage.getLocale();
    return storedLocale || getDefaultLocale();
}

export const loadLocalization = async () => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: require("./en.json"),
        es: require("./es.json"),
        zh: require("./zh.json"),
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = await initLang();
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
};

export const translate = (key: keyof typeof en, params: Record<string, string> = {}): string => {
    let translation = i18n.t(key);
    for (const param in params) {
        translation = translation.replace(`%${param}%`, params[param]);
    }
    return translation;
};
