import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { SpinnerProps } from "module/common/component/feedback/Spinner/Spinner";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { FormatNumberOptions } from "utils/formatNumber";

export type AppCurrency = FiatCurrencyType | "token";

export type BalanceAction = "display" | "add" | "round";

export interface BalanceProps extends Omit<TypographyProps, "children"> {
    balance: bigint | number | string;
    units?: string;
    unitsPosition?: "left" | "right";
    action?: BalanceAction;
    options?: FormatNumberOptions;
    isLoading?: boolean;
    spinnerProps?: SpinnerProps;
}
