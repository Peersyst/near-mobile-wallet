import { useFormatNumber } from "module/common/hook/useFormatNumber";
import formatBalance, { FormatBalanceOptions } from "module/wallet/component/display/Balance/utils/formatBalance";
import { balanceBelowMinimum, getNearDecimals, NEAR_LIMIT_DECIMAL } from "module/wallet/utils/treatNearDecimals";

export const useFormatBalance = (
    balance: bigint | number | string,
    { numberFormatOptions, units, unitsPosition, action }: FormatBalanceOptions,
) => {
    const unsignedBalance = balance.toString().replace(/-|,/g, "");
    const checkedBalance = balanceBelowMinimum(unsignedBalance) ? NEAR_LIMIT_DECIMAL : unsignedBalance;
    if (numberFormatOptions)
        numberFormatOptions.maximumFractionDigits = numberFormatOptions.maximumFractionDigits || getNearDecimals(checkedBalance);
    const formattedAction = balanceBelowMinimum(unsignedBalance) ? "round" : action;
    const formattedBalance = useFormatNumber(checkedBalance, numberFormatOptions);
    return formatBalance(formattedBalance, { action: formattedAction, units, unitsPosition });
};
