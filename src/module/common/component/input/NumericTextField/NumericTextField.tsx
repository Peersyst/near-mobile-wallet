import TextField from "../TextField/TextField";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { NumericInputProps } from "@peersyst/react-native-components";
import NumericInput from "./NumericInput";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: NumericInputProps["maxDecimals"];
};

const NumericTextField = ({ maxDecimals, ...props }: NumericTextFieldProps) => {
    return <TextField {...props} input={NumericInput} inputProps={{ maxDecimals }} />;
};

export default NumericTextField;
