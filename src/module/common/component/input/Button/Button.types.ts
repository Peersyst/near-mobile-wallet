import { StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface ButtonProps {
    onPress?: () => unknown;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}
