import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en/en";
import { es } from "./locales/es/es";
import { zh } from "./locales/zh/zh";
import LanguageDetectorPlugin from "./pluguins/LanguageDetectorPlugin/LanguageDetectorPlugin";

export const defaultNS = "translation";

export const resources = {
    en,
    es,
    zh,
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
            escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
            useSuspense: false, //   <---- this will do the magic
        },
    });

export default i18next;
