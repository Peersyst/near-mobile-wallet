import { useControlled } from "@peersyst/react-hooks";
import { TextFieldProps } from "../../TextField/TextField.types";
import formatNumber from "../utils/formatNumber";

export type UseNumericInputParams = Pick<TextFieldProps, "value" | "onChange" | "defaultValue"> & {
    locale?: string;
};
export type UseNumericInputResult = Pick<TextFieldProps, "value" | "onChange">;

export function getDecimalSeparator(locale: string): string {
    const number = 1.1;
    return number.toLocaleString(locale).substring(1, 2);
}

export function getGroupSeparator(locale: string): string {
    const value = (1000).toLocaleString(locale);
    return value.length === 5 ? value.substring(1, 2) : "";
}

export function useNumericInput({
    defaultValue = "",
    value: valueProp,
    onChange: onChangeProp,
    locale = "en",
}: UseNumericInputParams): UseNumericInputResult {
    const [value, setValue] = useControlled(defaultValue, valueProp, onChangeProp);
    const digitGroupingSeparator = getGroupSeparator(locale);
    const decimalSeparator = getDecimalSeparator(locale);
    const decimalRegExp = new RegExp("\\" + decimalSeparator, "g");
    const digitRegExp = new RegExp("\\" + digitGroupingSeparator, "g");
    const onChange = (newValue: string) => {
        if (newValue.endsWith(digitGroupingSeparator) || isNaN(Number(newValue.replace(digitRegExp, "").replace(decimalRegExp, "."))))
            return;
        else if (newValue === "") {
            setValue?.("");
        } else {
            const [int, dec] = newValue.split(decimalSeparator);
            const rawInt = int.replace(digitRegExp, "");
            const rawValue = rawInt + (newValue.includes(decimalSeparator) ? "." : "") + (dec || "");
            setValue?.(rawValue);
        }
    };
    return {
        value: formatNumber(value, locale),
        onChange,
    };
}
