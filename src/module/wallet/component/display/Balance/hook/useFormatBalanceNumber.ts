import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { removeTrailingZeros } from "near-peersyst-sdk";
import { isZero } from "../utils/balance.utils";

export interface FormatBalanceNumberParams {
    balance: string;
    decimals: number | undefined;
    fallBackDisplay: string;
    numberFormatOptions?: Intl.NumberFormatOptions;
}

export function useFormatBalanceNumber() {
    const formatNumber = useFormatNumber();

    /**
     * Formats a balance number with the correct number of decimals
     */
    function formatBalanceNumber({
        balance,
        fallBackDisplay,
        decimals,
        numberFormatOptions: { maximumFractionDigits, ...rest } = {},
    }: FormatBalanceNumberParams): string {
        //If balance is 0, return 0 easypeasy
        if (isZero(balance)) return "0";

        const showSpecificDecimals = maximumFractionDigits !== undefined;

        /**
         * If decimals is -1 it means that the balance is lower than the minimum
         * threshold of the thresholds array. In that case, and if we do not want to show a specefic number of decimals,
         * it will displayed the fallback display
         */
        if (decimals === -1 && !showSpecificDecimals) return fallBackDisplay;

        let decBalance = balance.split(".")[1];
        const decimalsToSlice = showSpecificDecimals ? maximumFractionDigits : decimals;

        if (decBalance && decimalsToSlice) {
            //Remove irrelevant decimals
            decBalance = decBalance.slice(0, decimalsToSlice + 1);
        }

        const showDecimals = decimals !== undefined && decBalance?.length > 0 && !isZero(decBalance);
        const finalDecimals = showDecimals ? Math.min(decBalance.length, decimals) : 0; //Default decimals

        const formattedBalance = formatNumber(balance, {
            ...(showDecimals && { minimumFractionDigits: finalDecimals, maximumFractionDigits: finalDecimals }),
            //override decimals if we want to show a specific number of decimals
            ...(showSpecificDecimals && { maximumFractionDigits }),
            ...rest,
        });

        return formattedBalance;
    }
    return formatBalanceNumber;
}
