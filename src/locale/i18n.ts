import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es, fr, id, it, ru, uk } from "./locales";

// Polyfill Intl as it is not included in RN
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/es";
import "intl/locale-data/jsonp/fr";
import "intl/locale-data/jsonp/id";
import "intl/locale-data/jsonp/it";
import "intl/locale-data/jsonp/ru";
import "intl/locale-data/jsonp/uk";
import LanguageDetectorPlugin from "./pluguins/LanguageDetectorPlugin/LanguageDetectorPlugin";

export const defaultNS = "translation";

export const resources = {
    en,
    es,
    it,
    id,
    fr,
    ru,
    uk,
} as const;

i18next
    .use(initReactI18next)
    .use(LanguageDetectorPlugin)
    .init({
        compatibilityJSON: "v3",
        fallbackLng: "en",
        resources,
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        returnNull: false,
    });

export default i18next;
