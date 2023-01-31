import { useFormatNumber } from "module/common/hook/useFormatNumber";
import formatBalance, { FormatBalanceOptions } from "module/wallet/component/display/Balance/utils/formatBalance";
import { getDecimalsFromThreshold, getMaxThreshold } from "module/wallet/component/display/Balance/utils/balanceDecimals";
import { Thresholds } from "module/wallet/component/display/Balance/BalanceThresholds";

export const useFormatBalance = (
    balance: bigint | number | string,
    { numberFormatOptions, units, unitsPosition, action, thresholds = Thresholds, minimumFallbackDisplay }: FormatBalanceOptions,
) => {
    const unsignedBalance = balance.toString().replace(/-|,/g, "");
    const maxThreshold = getMaxThreshold(thresholds);
    const balanceDecimals = getDecimalsFromThreshold(unsignedBalance, thresholds);
    const hasBalanceDecimals = balanceDecimals !== undefined;
    const maxDecimals = numberFormatOptions?.maximumFractionDigits || (hasBalanceDecimals ? balanceDecimals : maxThreshold.decimal);
    const fallbackBalance = typeof minimumFallbackDisplay === "function" ? minimumFallbackDisplay(unsignedBalance) : minimumFallbackDisplay;
    const toFormatBalance = hasBalanceDecimals ? unsignedBalance : fallbackBalance || maxThreshold.value;
    const formattedBalance = useFormatNumber(toFormatBalance, {
        ...numberFormatOptions,
        maximumFractionDigits: maxDecimals,
    });
    return formatBalance(formattedBalance, {
        action: hasBalanceDecimals ? action : "less",
        units,
        unitsPosition,
        minimumFallbackDisplay,
    });
};
