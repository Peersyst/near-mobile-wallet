import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-native-components";
import { TextInputProps } from "react-native";

export type TextFieldSize = "md" | "lg";

export interface TextFieldRootProps {
    size?: TextFieldSize;
}

export type TextFieldProps<P extends TextInputProps = TextInputProps> = TextFieldRootProps & BaseTextFieldProps<P>;
