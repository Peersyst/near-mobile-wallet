import { useTranslate } from "module/common/hook/useTranslate";

export default function (
    date?: Date | string | number,
    options: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
): string {
    const translate = useTranslate();
    return translate("date", {
        val: date ? new Date(date) : Date.now(),
        ...options,
    });
}
