import "i18next";
import { defaultNS, resources } from "./i18n";

/**
 * https://www.localeplanet.com/icu/iso3166.html
 * en: English
 * es: Spanish
 * fr: French
 * id: Indonesian
 * it: Italian
 * pt: Portuguese
 * ru: Russian
 * uk: Ukrainian
 * vi: Vietnamese
 */
export type LocaleType = "en" | "es" | "fr" | "id" | "it" | "pt" | "ru" | "uk" | "vi";
export type NameSpacesType = "translation" | "error";
export type ResourceType = typeof resources["en"];
export type ErrorResourceType = keyof ResourceType["error"];
export type TransaltionResourceType = keyof ResourceType["translation"];

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: ResourceType;
        returnNull: false;
    }
}
