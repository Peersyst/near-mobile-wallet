import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { FormatNumberOptions } from "utils/formatNumber";
import { AppCurrency, BalanceAction, BalanceProps } from "../Balance.types";
import { ACTION_LABEL } from "../utils/actionLabels";
import { CURRENCY_UNIT } from "../utils/currencies";

export interface FormatBalanceParams {
    formatedBalance: ReturnType<typeof useFormatNumber>;
    options?: FormatNumberOptions;
    units?: BalanceProps["units"];
    unitsPosition?: BalanceProps["unitsPosition"];
    action?: BalanceAction;
}

export interface UseFormatBalanceParams extends Omit<FormatBalanceParams, "formatedBalance"> {
    balance: BalanceProps["balance"];
}

export const formatBalance = ({ formatedBalance, action = "display", units, unitsPosition }: FormatBalanceParams) => {
    const actionLabel = ACTION_LABEL[action];
    const currencyUnit = units && (CURRENCY_UNIT[units as AppCurrency] || units);
    const balance = actionLabel + formatedBalance;
    if (!currencyUnit) return balance;
    if (unitsPosition === "left") {
        return currencyUnit + " " + balance;
    } else {
        return balance + " " + currencyUnit;
    }
};
export const useFormatBalance = ({ balance: balanceParam, options, units, unitsPosition, action }: UseFormatBalanceParams) => {
    const formatedBalance = useFormatNumber(balanceParam.toString(), options);
    return formatBalance({ formatedBalance, action, units, unitsPosition });
};
