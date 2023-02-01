import formatBalance from "module/wallet/component/display/Balance/utils/formatBalance";
import { THRESHOLDS } from "module/wallet/component/display/Balance/constants/balanceThresholds";
import { getDecimalsFromThreshold } from "../utils/getDecimalsFromThreshol";
import { getAction } from "../utils/getAction";
import { getTheMinimumThreshold, isZero } from "../utils/balance.utils";
import { useFormatBalanceNumber } from "./useFormatBalanceNumber";
import { UseFormatBalanceParams } from "../Balance.types";

export const useFormatBalance = (
    balance: bigint | number | string,
    { numberFormatOptions, units, unitsPosition, action, thresholds = THRESHOLDS, minimumFallbackDisplay }: UseFormatBalanceParams,
) => {
    const formatBalanceNumber = useFormatBalanceNumber();

    //Clean the incoming balance (turn into a string representation of a number, remove the negative sign if it has one)
    const unsignedBalance = balance.toString().replace(/-|,/g, "");
    const isNegative = balance.toString()[0] === "-";
    const isBalanceZero = isZero(unsignedBalance);

    //Get the number of decimals to use for the balance based on the thresholds
    const balanceDecimals = getDecimalsFromThreshold(unsignedBalance, thresholds);

    //If the balance is below the threshold, we will use the minimumFallbackDisplay
    const isBelowThreshold = balanceDecimals === -1 && !isBalanceZero;
    /*
     * Call the minimumFallbackDisplay if it is a function and the balance is below the threshold
     * The function is necessary for customization
     */
    if (isBelowThreshold && typeof minimumFallbackDisplay === "function") {
        return minimumFallbackDisplay(unsignedBalance);
    }

    //If the balance is below the threshold, we will use the less action if is not specified
    const finalAction = action || getAction(unsignedBalance, balanceDecimals);

    //If the balance is below the threshold, we will use the minimumFallbackDisplay
    const fallBackDisplay = (minimumFallbackDisplay || getTheMinimumThreshold(thresholds)) as string;

    //Get the formatted balance number (with the correct number of decimals)
    let formattedBalance = formatBalanceNumber({
        balance: unsignedBalance,
        decimals: balanceDecimals,
        fallBackDisplay,
        numberFormatOptions,
    });

    //If the balance is negative, we will add the negative sign
    if (isNegative) formattedBalance = "-" + formattedBalance;

    return formatBalance(formattedBalance, {
        action: finalAction,
        units,
        unitsPosition,
    });
};
