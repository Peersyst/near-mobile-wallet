import { useMergeDefaultProps, useNumericInput } from "@peersyst/react-components-core";
import { Platform, TextInput } from "react-native";
import { TextInputProps } from "react-native";

export interface NumericInputProps extends Omit<TextInputProps, "keyboardType"> {
    maxDecimals?: number;
}

const NumericInput = (props: NumericInputProps): JSX.Element => {
    const {
        value: valueProp,
        defaultValue,
        onChangeText: onChangeProp,
        maxDecimals,
        ...rest
    } = useMergeDefaultProps("NumericInput", props);

    const { value, onChange } = useNumericInput({
        defaultValue,
        value: valueProp,
        onChange: onChangeProp,
        maxDecimals,
    });

    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            keyboardType={Platform.OS === "android" ? "decimal-pad" : "numbers-and-punctuation"}
            {...rest}
        />
    );
};

export default NumericInput;
