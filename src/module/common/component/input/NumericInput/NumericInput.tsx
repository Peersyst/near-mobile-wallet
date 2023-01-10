import { TextFieldProps, NumericInput as BaseNumericInput } from "@peersyst/react-native-components";
import TextField from "../TextField/TextField";

export type NumericInputProps = Omit<TextFieldProps, "input" | "keyboardType">;

const NumericInput = (props: NumericInputProps) => {
    return <TextField input={BaseNumericInput} {...props} />;
};

export default NumericInput;
