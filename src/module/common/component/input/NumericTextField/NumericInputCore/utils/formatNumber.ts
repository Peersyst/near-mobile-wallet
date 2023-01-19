import { getDecimalSeparator, getGroupSeparator } from "./utils";

const formatNumber = (value: string, locale: string) => {
    const decimalSeparator = getDecimalSeparator(locale);
    const digitGroupingSeparator = getGroupSeparator(locale);
    if (value.endsWith(",") || isNaN(Number(value))) return "NaN";
    else if (value === "") return "";
    else {
        const [int, dec] = value.split(".");
        const digitGroupSeparatedInt = int.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)?.join(digitGroupingSeparator);
        return digitGroupSeparatedInt + (value.includes(".") ? decimalSeparator : "") + (dec || "");
    }
};

export const parseNumber = (value: string, digit: string, decimal: string): string => {
    return replaceAll(replaceAll(value, digit, ""), decimal, ".");
};

export function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function replaceAll(value: string, find: string, replace: string): string {
    return value.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

export default formatNumber;
