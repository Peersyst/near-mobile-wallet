import { ViewStyle } from "react-native";

export interface NumericPadProps {
    onSubmit: (pin: string) => unknown;
    onCancel?: () => unknown;
    placeholder?: string;
    error?: boolean;
    style?: ViewStyle;
}
