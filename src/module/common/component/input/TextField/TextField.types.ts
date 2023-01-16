import { TextFieldProps as BaseTextFieldProps } from "@peersyst/react-native-components";

export type TextFieldSize = "md" | "lg";

export interface TextFieldRootProps {
    size?: TextFieldSize;
}

export type TextFieldProps = TextFieldRootProps & BaseTextFieldProps;
