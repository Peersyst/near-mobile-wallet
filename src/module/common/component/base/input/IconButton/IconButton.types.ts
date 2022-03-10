import { ButtonProps as NativeButtonProps, TextStyle, ViewStyle } from "react-native";
import { SX } from "@peersyst/react-native-styled";
import { ReactElement } from "react";

export type IconButtonStyle = ViewStyle & TextStyle;
export type IconButtonStyles = IconButtonStyle & {
    pressed?: IconButtonStyle;
    disabled?: IconButtonStyle;
};

export interface IconButtonSxProps {
    pressed?: boolean;
    disabled?: boolean;
}

export interface IconButtonProps {
    /**
     * onPress handler
     */
    onPress?: NativeButtonProps["onPress"];
    /**
     * Disables button
     */
    disabled?: boolean;
    /**
     * Button's style
     */
    style?: IconButtonStyles;
    /**
     * Button sx
     */
    sx?: SX<IconButtonSxProps, IconButtonStyles>;
    /**
     * Button's text content
     */
    children: ReactElement;
}