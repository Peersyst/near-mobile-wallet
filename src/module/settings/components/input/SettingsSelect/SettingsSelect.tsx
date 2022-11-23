import Select, { SelectProps } from "module/common/component/input/Select/Select";
import { ViewStyle } from "react-native";
import { SettingsSelectRoot } from "./SettingsSelect.styles";

export interface SettingsSelectProps<T> extends Omit<SelectProps<T>, "style"> {
    selectStyle?: SelectProps<T>["style"];
    style?: ViewStyle;
}

function SettingsSelect<T>({ style, selectStyle, ...rest }: SettingsSelectProps<T>) {
    return (
        <SettingsSelectRoot style={style}>
            <Select<T> {...rest} style={selectStyle} />
        </SettingsSelectRoot>
    );
}

export default SettingsSelect;
