import { Picker as BasePicker } from "@react-native-picker/picker";
import { useState } from "react";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { PickerProps } from "./Picker.types";
import { useFormNotification } from "react-native-components";

const Picker = ({ selectedValue, onValueChange, children, name, required, ...rest }: PickerProps): JSX.Element => {
    const [ownValue, setOwnValue] = useState<ItemValue>();
    const value = ownValue ?? selectedValue;
    useFormNotification(name, value ?? selectedValue, !required || !!value);

    const handleChange = (v: ItemValue, i: number): void => {
        if (onValueChange) {
            onValueChange(v, i);
        } else {
            setOwnValue(v);
        }
    };

    return (
        <BasePicker selectedValue={value} onValueChange={handleChange} {...rest}>
            {children}
        </BasePicker>
    );
};

Picker.Item = BasePicker.Item;
export default Picker;
