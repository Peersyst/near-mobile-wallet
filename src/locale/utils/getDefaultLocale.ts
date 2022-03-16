import * as Localization from "expo-localization";

export type LocaleType = "en" | "es";

const locales: string[] = ["en", "es"];

export default function getDefaultLocale(): LocaleType {
    const locale = Localization.locale.slice(0, 2);
    if(locales.includes(locale)) return locale as LocaleType;
    else return "en"
}