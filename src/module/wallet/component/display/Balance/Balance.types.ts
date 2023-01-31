import { SpinnerProps } from "@peersyst/react-native-components";
import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { FullNumber } from "module/common/types";
import { FiatCurrencyType } from "module/settings/state/SettingsState";

export type AppCurrency = FiatCurrencyType | "token";

export type BalanceAction = "display" | "add" | "round" | "less";

export interface BalanceThreshold {
    value: number;
    decimal: number;
}

export interface BalanceProps extends Omit<TypographyProps, "children" | "numberOfLines"> {
    balance: FullNumber;
    units?: AppCurrency | string;
    unitsPosition?: "left" | "right";
    action?: BalanceAction;
    options?: Intl.NumberFormatOptions;
    isLoading?: boolean;
    spinnerProps?: SpinnerProps;
    thresholds?: BalanceThreshold[];
}
