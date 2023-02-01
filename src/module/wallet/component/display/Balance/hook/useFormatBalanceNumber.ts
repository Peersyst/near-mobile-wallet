import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { isZero } from "../utils/balance.utils";

export interface FormatBalanceNumberParams {
    balance: string;
    decimals: number | undefined;
    fallBackDisplay: string;
    numberFormatOptions?: Intl.NumberFormatOptions;
}

export const MAX_NUMBER_OF_SUPPORTED_DECIMALS = 18; //i18next

export function useFormatBalanceNumber() {
    const formatNumber = useFormatNumber();
    function formatBalanceNumber({ balance, fallBackDisplay, decimals, numberFormatOptions }: FormatBalanceNumberParams): string {
        if (isZero(balance)) return "0";
        if (decimals === -1 && numberFormatOptions?.maximumFractionDigits === undefined) return fallBackDisplay;
        let decBalance = balance.split(".")[1];

        const decimalsToSlice =
            numberFormatOptions?.maximumFractionDigits !== undefined ? numberFormatOptions.maximumFractionDigits : decimals;
        decBalance =
            decBalance && decimalsToSlice
                ? decBalance.slice(0, Math.min(decimalsToSlice + 1, MAX_NUMBER_OF_SUPPORTED_DECIMALS))
                : decBalance;

        const showDecimals = decimals !== undefined && decBalance?.length > 0 && !isZero(decBalance);
        const finalDecimals = showDecimals ? Math.min(decBalance.length, decimals) : 0;

        const formattedBalance = formatNumber(balance, {
            ...(showDecimals && { minimumFractionDigits: finalDecimals, maximumFractionDigits: finalDecimals }),
            ...numberFormatOptions,
            ...(numberFormatOptions?.maximumFractionDigits !== undefined && {
                maximumFractionDigits: Math.min(numberFormatOptions.maximumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
            ...(numberFormatOptions?.minimumFractionDigits !== undefined && {
                minimumFractionDigits: Math.min(numberFormatOptions.minimumFractionDigits, MAX_NUMBER_OF_SUPPORTED_DECIMALS),
            }),
        });

        return formattedBalance;
    }
    return formatBalanceNumber;
}
