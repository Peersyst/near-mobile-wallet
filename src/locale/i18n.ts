import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es, fr, id, it, ru, uk, pt, vi, zh_CN, zh_TW, sw } from "./locales";

import LanguageDetectorPlugin from "./pluguins/LanguageDetectorPlugin/LanguageDetectorPlugin";
import { LocaleType } from "./i18n.types";

export const defaultNS = "translation";

export const resources = { en, es, fr, id, it, pt, ru, sw, uk, vi, ["zh-CN"]: zh_CN, ["zh-TW"]: zh_TW } as const;

export const APP_LOCALES = Object.keys(resources) as LocaleType[];

export const i18nextInitializationPromise = i18next
    .use(initReactI18next)
    .use(LanguageDetectorPlugin)
    .init({
        compatibilityJSON: "v3",
        fallbackLng: "en",
        resources,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        returnNull: false,
    });

export default i18next;
