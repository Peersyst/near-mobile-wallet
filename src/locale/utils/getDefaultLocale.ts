import * as Localization from "expo-localization";

export type LocaleType = "en" | "es";

const locales: string[] = ["en", "es"];

export default function getDefaultLocale(): LocaleType {
    const systemLocale = Localization.locale.slice(0, 2);
    if (locales.includes(systemLocale)) return systemLocale as LocaleType;
    else return "en";
}
