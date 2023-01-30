import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en/en";
import { es } from "./locales/es/es";
// Polyfill Intl as it is not included in RN
import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/es";
import LanguageDetectorPlugin from "./pluguins/LanguageDetectorPlugin/LanguageDetectorPlugin";

export const defaultNS = "translation";

export const resources = {
    en,
    es,
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
