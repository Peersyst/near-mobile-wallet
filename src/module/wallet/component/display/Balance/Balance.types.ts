import { TextStyle, ViewStyle } from "react-native";
import { TypographyProps } from "react-native-components";

export interface BalanceProps extends Omit<TypographyProps, "children" | "numberOfLines" | "textAlign" | "style"> {
    balance: string;
    boldUnits?: boolean;
    smallBalance?: boolean;
    action?: "display" | "add" | "subtract";
    units: string;
    style?: ViewStyle & TextStyle;
}

export type BalanceItemProps = Pick<BalanceProps, "smallBalance" | "variant" | "action">;
