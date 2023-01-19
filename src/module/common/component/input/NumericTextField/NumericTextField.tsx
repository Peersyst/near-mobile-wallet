import TextField from "../TextField/TextField";
import { NumericInput, NumericInputProps } from "module/common/component/input/NumericTextField/NumericInput";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: NumericInputProps["maxDecimals"];
};

const NumericTextField = ({ maxDecimals, ...props }: NumericTextFieldProps) => {
    return <TextField {...props} input={NumericInput} inputProps={{ maxDecimals }} />;
};

export default NumericTextField;
