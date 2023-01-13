import { TextFieldProps, NumericInput as BaseNumericInput } from "@peersyst/react-native-components";
import TextField from "../TextField/TextField";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType">;

const NumericTextField = (props: NumericTextFieldProps) => {
    return <TextField input={BaseNumericInput} {...props} />;
};

export default NumericTextField;
