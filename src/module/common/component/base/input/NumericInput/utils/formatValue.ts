import * as Localization from "expo-localization";

export const decimalRegExp = new RegExp("\\" + Localization.decimalSeparator, "g");
export const digitRegExp = new RegExp("\\" + Localization.digitGroupingSeparator, "g");

const format = (value: string) => {
    if (value.endsWith(",") || isNaN(Number(value))) return "NaN";
    else if (value === "") return "";
    else {
        const [int, dec] = value.split(".");
        const digitGroupSeparatedInt = int.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)?.join(Localization.digitGroupingSeparator);
        return digitGroupSeparatedInt + (value.includes(".") ? Localization.decimalSeparator : "") + (dec || "");
    }
};

export default format;
