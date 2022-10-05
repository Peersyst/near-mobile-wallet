import { ViewStyle } from "react-native";

export type ContainerStyle = ViewStyle;

export interface ContainerProps {
    onPress?: () => unknown;
    fullWidth?: boolean;
    style?: ContainerStyle;
    children?: JSX.Element;
}
