export function getDecimalSeparator(locale?: string): string {
    const number = 1.1;
    return number.toLocaleString(locale).substring(1, 2);
}

export function getGroupSeparator(locale?: string): string {
    const value = (1000).toLocaleString(locale);
    if (value.length === 5) return value.substring(1, 2);
    else {
        return getDecimalSeparator(locale) === "," ? "." : ",";
    }
}
