import { useFormatNumber } from "module/common/hook/useFormatNumber";
import formatBalance, { FormatBalanceOptions } from "module/wallet/component/display/Balance/utils/formatBalance";

export const useFormatBalance = (
    balance: bigint | number | string,
    { numberFormatOptions, units, unitsPosition, action }: FormatBalanceOptions,
) => {
    const unsignedBalance = balance.toString().replace(/-|,/g, "");
    const formattedBalance = useFormatNumber(unsignedBalance, numberFormatOptions);
    return formatBalance(formattedBalance, { action, units, unitsPosition });
};
