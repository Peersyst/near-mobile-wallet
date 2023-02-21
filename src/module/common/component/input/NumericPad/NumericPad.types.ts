import { ViewStyle } from "react-native";
import { KeyboardProps } from "module/common/component/input/Keyboard/Keyboard";

export interface NumericPadProps {
    onSubmit: (pin: string) => void | Promise<void>;
    onCancel?: () => unknown;
    placeholder?: string;
    error?: boolean;
    belowLogo?: boolean;
    style?: ViewStyle;
    optionalItem?: KeyboardProps["optionalItem"];
}

export interface NumericPadRootProps {
    belowLogo: boolean;
}
