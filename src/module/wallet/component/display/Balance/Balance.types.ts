import { SpinnerProps } from "@peersyst/react-native-components";
import { TypographyProps } from "module/common/component/display/Typography/Typography";
import { FullNumber } from "module/common/types";
import { FiatCurrencyType } from "module/settings/state/SettingsState";

export type AppCurrency = FiatCurrencyType | "token";

export type BalanceAction = "display" | "add" | "round" | "less";

export enum BalanceActions {
    DISPLAY = "display",
    ADD = "add",
    ROUND = "round",
    LESS = "less",
}

export interface BalanceThreshold {
    value: number;
    decimals: number;
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
    minimumFallbackDisplay?: string | ((balance: number | string | bigint) => string);
}

export interface FormatBalanceOptions {
    units?: BalanceProps["units"];
    unitsPosition?: BalanceProps["unitsPosition"];
    action?: BalanceAction;
}

export interface UseFormatBalanceParams extends FormatBalanceOptions {
    thresholds?: BalanceThreshold[];
    numberFormatOptions?: Omit<Intl.NumberFormatOptions, "useGrouping">;
    /**
     * It can be a string or a function that returns a string.
     * If is a string it will be used as the minimum fallback display. Ej: "0.000001"
     * If is a function it will be called with the balance as a parameter and it should return a string. Ej: (balance) => "1 Sat"
     */
    minimumFallbackDisplay?: string | ((balance: number | string | bigint) => string);
}
