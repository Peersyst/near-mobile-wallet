import { ViewStyle } from "react-native";

export type NumericPadStyle = ViewStyle & { gap?: number | string };

export interface NumericPadProps {
    onSubmit: (pin: string) => unknown;
    placeholder?: string;
    error?: boolean;
    style?: NumericPadStyle;
}
