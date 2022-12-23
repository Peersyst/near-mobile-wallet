import { LocaleType } from "locale";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

const cleanDate = (date: string) => {
    return date.charAt(0).toUpperCase() + date.slice(1).replace(/\./g, "");
};

export const formatDate = (
    locale: LocaleType,
    date?: Date | string | number,
    options: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
) => {
    try {
        const finalDate = new Date(date || Date.now());
        const weekday = cleanDate(new Intl.DateTimeFormat(locale, { weekday: options.weekday }).format(finalDate));
        const day = new Intl.DateTimeFormat(locale, { day: options.day }).format(finalDate);
        const month = cleanDate(new Intl.DateTimeFormat(locale, { month: options.month }).format(finalDate));
        const year = new Intl.DateTimeFormat(locale, { year: options.year }).format(finalDate);
        return `${weekday} ${day} ${month}, ${year}`;
    } catch (e) {
        return date?.toString() || "";
    }
};

export default function (
    date?: Date | string | number,
    options: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
): string {
    const { locale = "en" } = useRecoilValue(settingsState);
    return formatDate(locale, date, options);
}
