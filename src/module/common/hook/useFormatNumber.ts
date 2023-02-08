import { useTranslate } from "module/common/hook/useTranslate";
import { removeTrailingZeros } from "near-peersyst-sdk";

export const MAX_NUMBER_OF_SUPPORTED_DECIMALS = 18; //i18next

export const useFormatNumber = () => {
    const translate = useTranslate();
    function formatNumber(n: number | string, { maximumFractionDigits, minimumFractionDigits, ...rest }: Intl.NumberFormatOptions = {}) {
        const [integer, decimal] = n.toString().split(".");
        const finalNumber = decimal ? `${integer}.${decimal.slice(0, MAX_NUMBER_OF_SUPPORTED_DECIMALS)}` : integer;
        const tempNumber = translate("number", {
            val: finalNumber,
            ...(minimumFractionDigits !== undefined && {
                minimumFractionDigits: Math.min(minimumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
            ...(maximumFractionDigits !== undefined && {
                maximumFractionDigits: Math.min(maximumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
            ...rest,
        });
        const decimalSeparator = translate("number", { val: 1.1 }).slice(1, 2);
        const [integerPart, decimalPart] = tempNumber.split(decimalSeparator);

        if (decimalPart) {
            const decimalPartWithoutTrailingZeros = removeTrailingZeros(decimalPart);
            if (decimalPartWithoutTrailingZeros.length === 0) return integerPart;
            return `${integerPart + decimalSeparator + decimalPartWithoutTrailingZeros}`;
        }
        return tempNumber;
    }
    return formatNumber;
};
