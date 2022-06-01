import * as Localization from "expo-localization";
import { minDigits as _minDigits } from "@peersyst/react-utils";

export interface FormatNumberOptions {
    minDigits?: number;
    minDecimals?: number;
    maxDecimals?: number;
    split?: boolean;
    showAllDecimals?: boolean;
}

export default function (
    n: number | string,
    { minDecimals = 0, minDigits = 0, maxDecimals, split = false, showAllDecimals = false }: FormatNumberOptions = {},
): string | [string, string | undefined, string | undefined] {
    const [int, dec = minDecimals ? _minDigits(0, minDecimals) : undefined] = n
        .toString()
        .split(".")
        .map((num, i) => {
            if (i === 0) return _minDigits(num, minDigits, { fill: "left" });
            else {
                const decimals = _minDigits(num, minDecimals, { fill: "right" });
                return decimals.substring(0, showAllDecimals ? decimals.length : maxDecimals);
            }
        });
    const digitGroupingSeparator = Localization.digitGroupingSeparator;
    const decimalSeparator = Localization.decimalSeparator;
    const digitGroupSeparatedInt = int.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)?.join(digitGroupingSeparator);
    return split
        ? [digitGroupSeparatedInt!, dec ? decimalSeparator : undefined, dec]
        : digitGroupSeparatedInt + (dec ? decimalSeparator + dec : "");
}
