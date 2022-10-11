import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { AppCurrency, BalanceAction, BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export interface FormatBalanceOptions {
    numberFormatOptions?: Omit<Intl.NumberFormatOptions, "useGrouping">;
    units?: BalanceProps["units"];
    unitsPosition?: BalanceProps["unitsPosition"];
    action?: BalanceAction;
}

export default function (formattedBalanceNumber: string, { action = "display", units, unitsPosition }: FormatBalanceOptions): string {
    const actionLabel = ACTION_LABEL[action];
    const currencyUnit = units && (CURRENCY_UNIT[units as AppCurrency] || units);
    const balanceWithLabel = actionLabel + formattedBalanceNumber.toString();
    if (!currencyUnit) return balanceWithLabel;
    if (unitsPosition === "left") {
        return currencyUnit + " " + balanceWithLabel;
    } else {
        return balanceWithLabel + " " + currencyUnit;
    }
}
