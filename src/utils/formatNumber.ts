import { minDigits as _minDigits } from "@peersyst/react-utils";
import { LocaleType } from "locale";

type Separator = "." | ",";

export interface FormatNumberOptions {
    minDigits?: number;
    minDecimals?: number;
    maxDecimals?: number;
    split?: boolean;
    showAllDecimals?: boolean;
}

const separators: Record<LocaleType, { decimal: Separator; group: Separator }> = {
    es: {
        decimal: ",",
        group: ".",
    },
    en: {
        decimal: ".",
        group: ",",
    },
};

export default function (
    n: number | string,
    { minDecimals = 0, minDigits = 0, maxDecimals, split = false, showAllDecimals = false }: FormatNumberOptions = {},
    lang?: LocaleType,
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
    const { decimal, group } = separators[lang || "en"];
    const digitGroupSeparatedInt = int.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)?.join(group);
    return split ? [digitGroupSeparatedInt!, dec ? decimal : undefined, dec] : digitGroupSeparatedInt + (dec ? decimal + dec : "");
}
