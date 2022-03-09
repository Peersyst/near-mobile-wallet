import { TextStyle, ViewStyle } from "react-native";
import { TypographyProps } from "react-native-components";

export interface BalanceProps extends Pick<TypographyProps, "variant"> {
    balance: string;
    tokenBold?: boolean;
    unitsBold?: boolean;
    smallBalance?: boolean;
    action?: "display" | "add" | "substract";
    units: string;
    style?: ViewStyle & TextStyle;
}

export interface BalanceItemProps extends Pick<BalanceProps, "smallBalance" | "variant" | "action"> {
    bold?: boolean;
}
