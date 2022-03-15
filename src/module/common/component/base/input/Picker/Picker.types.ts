import { PickerProps as BasePickerProps } from "@react-native-picker/picker";

export interface PickerProps extends BasePickerProps {
    required?: boolean;
    name?: string;
}
