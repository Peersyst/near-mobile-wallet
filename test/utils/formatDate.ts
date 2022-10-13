export default function (
    date?: Date | string | number,
    options: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short", year: "numeric" },
): string {
    return Intl.DateTimeFormat(undefined, options).format(date ? new Date(date) : Date.now());
}
