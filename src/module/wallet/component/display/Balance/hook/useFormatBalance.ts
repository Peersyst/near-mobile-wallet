import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { FormatNumberOptions } from "utils/formatNumber";
import { AppCurrency, BalanceAction, BalanceProps } from "../Balance.types";
import { ACTION_LABEL } from "../utils/actionLabels";
import { CURRENCY_UNIT } from "../utils/currencies";

export interface FormatBalanceParams {
    formattedBalance: ReturnType<typeof useFormatNumber>;
    options?: Omit<FormatNumberOptions, "split">;
    units?: BalanceProps["units"];
    unitsPosition?: BalanceProps["unitsPosition"];
    action?: BalanceAction;
}

export interface UseFormatBalanceParams extends Omit<FormatBalanceParams, "formattedBalance"> {
    balance: BalanceProps["balance"];
}

export const formatBalance = ({ formattedBalance, action = "display", units, unitsPosition }: FormatBalanceParams) => {
    const actionLabel = ACTION_LABEL[action];
    const currencyUnit = units && (CURRENCY_UNIT[units as AppCurrency] || units);
    const balance = actionLabel + formattedBalance;
    if (!currencyUnit) return balance;
    if (unitsPosition === "left") {
        return currencyUnit + " " + balance;
    } else {
        return balance + " " + currencyUnit;
    }
};

export const useFormatBalance = ({ balance: balanceParam, options, units, unitsPosition, action }: UseFormatBalanceParams) => {
    const formattedBalance = useFormatNumber(balanceParam.toString(), options);
    return formatBalance({ formattedBalance, action, units, unitsPosition });
};
