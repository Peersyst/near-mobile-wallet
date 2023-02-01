import { useTranslate } from "module/common/hook/useTranslate";
import { MAX_NUMBER_OF_SUPPORTED_DECIMALS } from "module/wallet/component/display/Balance/hook/useFormatBalanceNumber";

export const useFormatNumber = () => {
    const translate = useTranslate();
    function formatNumber(n: number | string, options?: Intl.NumberFormatOptions) {
        return translate("number", { val: n.toString().slice(0, MAX_NUMBER_OF_SUPPORTED_DECIMALS), ...options });
    }
    return formatNumber;
};
