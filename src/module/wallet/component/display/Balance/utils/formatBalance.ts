import { AppCurrency, FormatBalanceOptions } from "module/wallet/component/display/Balance/Balance.types";
import { ACTION_LABEL } from "../constants/actionLabels";
import { CURRENCY_UNIT } from "../constants/currencies";

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
