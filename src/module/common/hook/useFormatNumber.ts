import { useTranslate } from "module/common/hook/useTranslate";

export const MAX_NUMBER_OF_SUPPORTED_DECIMALS = 18; //i18next

export const useFormatNumber = () => {
    const translate = useTranslate();
    function formatNumber(n: number | string, { maximumFractionDigits, minimumFractionDigits, ...rest }: Intl.NumberFormatOptions = {}) {
        const [integer, decimal] = n.toString().split(".");
        const finalNumber = decimal ? `${integer}.${decimal.slice(0, MAX_NUMBER_OF_SUPPORTED_DECIMALS)}` : integer;
        return translate("number", {
            val: finalNumber,
            ...(minimumFractionDigits !== undefined && {
                minimumFractionDigits: Math.min(minimumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
            ...(maximumFractionDigits !== undefined && {
                maximumFractionDigits: Math.min(maximumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
            ...rest,
        });
    }
    return formatNumber;
};
