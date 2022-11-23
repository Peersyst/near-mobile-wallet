import { ViewStyle } from "react-native";

export interface NumericPadProps {
    onSubmit: (pin: string) => void | Promise<void>;
    onCancel?: () => unknown;
    placeholder?: string;
    error?: boolean;
    belowLogo?: boolean;
    style?: ViewStyle;
}

export interface NumericPadRootProps {
    belowLogo: boolean;
}
