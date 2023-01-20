import TextField from "../TextField/TextField";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { NumericInput, NumericInputProps } from "@peersyst/react-native-components";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: NumericInputProps["maxDecimals"];
};

const NumericTextField = ({ maxDecimals, ...props }: NumericTextFieldProps) => {
    return <TextField {...props} input={NumericInput} inputProps={{ maxDecimals }} />;
};

export default NumericTextField;
