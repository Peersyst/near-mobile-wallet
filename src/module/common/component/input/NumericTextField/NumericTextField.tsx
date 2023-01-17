import { TextFieldProps } from "@peersyst/react-native-components";
import TextField from "../TextField/TextField";
import { useNumericInput } from "./NumericInput";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: number;
};

const NumericTextField = ({ value: valueProp, onChange: onChangeProp, defaultValue, maxDecimals, ...rest }: NumericTextFieldProps) => {
    const { onChange, value } = useNumericInput({ value: valueProp, defaultValue, onChange: onChangeProp, maxDecimals });
    return <TextField {...rest} onChange={onChange} value={value} />;
};

export default NumericTextField;
