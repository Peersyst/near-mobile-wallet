import { useControlled } from "@peersyst/react-hooks";
import { CoreTextInputProps } from "@peersyst/react-components-core";

import { getGroupSeparator, getDecimalSeparator, formatNumber } from "../utils";

export type UseNumericInputParams = Pick<CoreTextInputProps, "value" | "onChange" | "defaultValue"> & {
    locale?: string;
    maxDecimals?: number;
};
export type UseNumericInputResult = Pick<CoreTextInputProps, "value" | "onChange">;

export default function useNumericInput({
    defaultValue = "",
    value: valueProp,
    onChange: onChangeProp,
    locale,
    maxDecimals,
}: UseNumericInputParams): UseNumericInputResult {
    const [value, setValue] = useControlled(defaultValue, valueProp, onChangeProp);
    const defaultLocale = "en";
    const finalLocale = locale || defaultLocale;
    const digitGroupingSeparator = getGroupSeparator(finalLocale);
    const decimalSeparator = getDecimalSeparator(finalLocale);
    const decimalRegExp = new RegExp("\\" + decimalSeparator, "g");
    const digitRegExp = new RegExp("\\" + digitGroupingSeparator, "g");

    const onChange = (newValue: string) => {
        if (newValue.endsWith(digitGroupingSeparator) || isNaN(Number(newValue.replace(digitRegExp, "").replace(decimalRegExp, "."))))
            return;
        else if (newValue === "") {
            setValue?.("");
        } else {
            const [int, dec] = newValue.split(decimalSeparator);
            if (maxDecimals !== undefined && dec && dec.length > maxDecimals) return;
            const rawInt = int.replace(digitRegExp, "");
            const rawValue = rawInt + (newValue.includes(decimalSeparator) ? "." : "") + (dec || "");
            setValue?.(rawValue);
        }
    };

    return {
        value: formatNumber(value, finalLocale),
        onChange,
    };
}
