import TextField from "../TextField/TextField";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useNumericInput } from "@peersyst/react-native-components";

export type NumericTextFieldProps = Omit<TextFieldProps, "input" | "keyboardType"> & {
    maxDecimals?: number;
};

const NumericTextField = ({ maxDecimals, ...props }: NumericTextFieldProps) => {
    const { format, parse } = useNumericInput({ maxDecimals });

    return <TextField format={format} parse={parse} {...props} />;
};

export default NumericTextField;
