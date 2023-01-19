import { NumericInputProps } from "./NumericInput.types";
import { useComponentConfig, useMergeDefaultProps } from "@peersyst/react-components-core";
import { TextInput } from "react-native";
import { useNumericInput } from "module/common/component/input/NumericTextField/NumericInputCore";

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

    return <TextInput value={value} onChangeText={onChange} keyboardType="numeric" {...rest} />;
};

export default NumericInput;
