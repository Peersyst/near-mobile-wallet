import TextField from "module/common/component/input/TextField/TextField";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useNumericInput } from "./hook/useNumericInput";

export type NumericInputProps = Omit<TextFieldProps, "keyboardType">;

const NumericInput = ({ onChange: onChangeProp, value: valueProp, defaultValue, ...rest }: NumericInputProps) => {
    const { locale = "en" } = useRecoilValue(settingsState);
    const { value, onChange } = useNumericInput({ onChange: onChangeProp, value: valueProp, defaultValue, locale });
    return <TextField value={value} onChange={onChange} keyboardType="numeric" {...rest} />;
};

export default NumericInput;
