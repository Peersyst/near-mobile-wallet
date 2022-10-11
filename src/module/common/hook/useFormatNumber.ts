import { useTranslate } from "module/common/hook/useTranslate";

export const useFormatNumber = (n: number | string, options?: Intl.NumberFormatOptions) => {
    const translate = useTranslate();
    return translate("number", { val: n, ...options });
};
