import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { FormatNumberOptions } from "utils/formatNumber";

export type AppCurrency = FiatCurrencyType | "near";

export type BalanceAction = "display" | "add";

export interface BalanceProps extends Omit<TypographyProps, "children"> {
    balance: bigint | number | string;
    unit?: AppCurrency;
    unitPosition?: "left" | "right";
    action?: BalanceAction;
    options?: FormatNumberOptions;
}
