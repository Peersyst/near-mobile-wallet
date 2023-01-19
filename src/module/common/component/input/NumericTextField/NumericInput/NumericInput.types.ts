import { TextInputProps } from "react-native";

export interface NumericInputProps extends Omit<TextInputProps, "keyboardType"> {
    maxDecimals?: number;
}
