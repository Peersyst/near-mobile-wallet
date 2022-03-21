import * as Localization from "expo-localization";
import { LocaleType } from "locale";

const locales: string[] = ["en", "es"];

export default function getDefaultLocale(): LocaleType {
    const systemLocale = Localization.locale.slice(0, 2);
    if (locales.includes(systemLocale)) return systemLocale as LocaleType;
    else return "en";
}
