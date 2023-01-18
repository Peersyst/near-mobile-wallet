import { NumericInput, NumericInputProps, TextFieldProps } from "@peersyst/react-native-components";
import TextField from "../TextField/TextField";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: NumericInputProps["maxDecimals"];
};

const NumericTextField = (props: NumericTextFieldProps) => {
    return <TextField {...props} input={NumericInput} />;
};

export default NumericTextField;
