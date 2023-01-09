import { getDecimalSeparator, getGroupSeparator } from "../hook/useNumericInput";

const formatNumber = (value: string, locale: string) => {
    const digitGroupingSeparator = getGroupSeparator(locale);
    const decimalSeparator = getDecimalSeparator(locale);
    if (value.endsWith(",") || isNaN(Number(value))) return "NaN";
    else if (value === "") return "";
    else {
        const [int, dec] = value.split(".");
        const digitGroupSeparatedInt = int.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)?.join(digitGroupingSeparator);
        return digitGroupSeparatedInt + (value.includes(".") ? decimalSeparator : "") + (dec || "");
    }
};

export default formatNumber;
