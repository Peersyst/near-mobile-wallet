import { useControlled } from "@peersyst/react-hooks";
import { CoreTextInputProps } from "@peersyst/react-components-core";
import { getGroupSeparator, getDecimalSeparator, formatNumber } from "../utils";
import { parseNumber, replaceAll } from "module/common/component/input/NumericTextField/NumericInputCore/utils/formatNumber";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

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
    const defaultLocale = useRecoilValue(settingsState).locale;
    const finalLocale = locale || defaultLocale || "en";
    const digitGroupingSeparator = getGroupSeparator(finalLocale);
    const decimalSeparator = getDecimalSeparator(finalLocale);

    const onChange = (newValue: string) => {
        const numberParsed = parseNumber(newValue, digitGroupingSeparator, decimalSeparator);
        console.log(Number(numberParsed));
        if (newValue.endsWith(digitGroupingSeparator) || isNaN(Number(numberParsed))) return;
        else if (newValue === "") {
            setValue?.("");
        } else {
            const [int, dec] = newValue.split(decimalSeparator);
            if (maxDecimals !== undefined && dec && dec.length > maxDecimals) return;
            const rawInt = replaceAll(int, digitGroupingSeparator, "");
            const rawValue = rawInt + (newValue.includes(decimalSeparator) ? "." : "") + (dec || "");
            setValue?.(rawValue);
        }
    };

    return {
        value: formatNumber(value, finalLocale),
        onChange,
    };
}
