export function getDecimalSeparator(locale?: string): string {
    const number = 1.1;
    return number.toLocaleString(locale).substring(1, 2);
}

export function getGroupSeparator(locale?: string): string {
    const value = (1000).toLocaleString(locale);
    return value.length === 5 ? value.substring(1, 2) : "";
}
