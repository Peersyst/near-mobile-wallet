import "react-i18next";
import { defaultNS, resources } from "./i18n";

export type LocaleType = "es" | "en";
export type NameSpacesType = "translation" | "error";
export type ResourceType = typeof resources["en"];
export type ErrorResourceType = keyof ResourceType["error"];
export type TransaltionResourceType = keyof ResourceType["translation"];

declare module "react-i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: ResourceType;
    }
}
