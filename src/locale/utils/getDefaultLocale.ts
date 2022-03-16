import * as Localization from "expo-localization";
import { SettingsStorage } from "module/settings/SettingsStorage";

export type LocaleType = "en" | "es";

const locales: string[] = ["en", "es"];

export default function getDefaultLocale(): LocaleType {
    const systemLocale = Localization.locale.slice(0, 2);
    if (locales.includes(systemLocale)) return systemLocale as LocaleType;
    else return "en";
}

export async function initLang(): Promise<LocaleType> {
    const storedLocale = await SettingsStorage.getLocale();
    return storedLocale || getDefaultLocale();
}
