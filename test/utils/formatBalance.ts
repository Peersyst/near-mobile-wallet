import { FormatBalanceOptions } from "module/wallet/component/display/Balance/Balance.types";
import baseFormatBalance from "module/wallet/component/display/Balance/utils/formatBalance";

export const formatBalance = (balance: bigint | number | string, { action = "display", units, unitsPosition }: FormatBalanceOptions) => {
    const formattedBalanceNumber = Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Number(balance));
    return baseFormatBalance(formattedBalanceNumber, { action, units, unitsPosition });
};
