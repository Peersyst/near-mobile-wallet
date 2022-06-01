import { TextInputProps } from "react-native";

export type NumericInputProps = Omit<TextInputProps, "keyboardType">;
