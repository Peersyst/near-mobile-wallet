import { ViewStyle, TextStyle, ButtonProps as NativeButtonProps } from "react-native";
import { ReactElement, ReactNode } from "react";
import { SX } from "@peersyst/react-native-styled";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonVariant = "contained" | "text" | "outlined";

export type ButtonStyle = ViewStyle & TextStyle;
export interface ButtonVariantStyle {
    contained?: ButtonStyle;
    text?: ButtonStyle;
    outlined?: ButtonStyle;
}
export type ButtonStyleWithVariant = ButtonStyle & ButtonVariantStyle;

export interface ButtonSizeStyle {
    sm?: ButtonStyle;
    md?: ButtonStyle;
    lg?: ButtonStyle;
}
export type ButtonStyles = ButtonStyleWithVariant & {
    disabled?: ButtonStyleWithVariant;
    pressed?: ButtonStyleWithVariant;
} & ButtonSizeStyle;

export interface ButtonRootProps {
    fullWidth: boolean;
}

export interface ButtonContainerProps {
    isLoading: boolean;
}

/**
 * Buttons props omit title in order to make button generic
 */
export interface ButtonProps extends Omit<NativeButtonProps, "title" | "color" | "onPress"> {
    /**
     * onPress handler
     */
    onPress?: NativeButtonProps["onPress"];
    /**
     * Prop to display a loading spinner.
     */
    loading?: boolean;
    /**
     * Disables button
     */
    disabled?: boolean;
    /**
     * Add custom loading element *
     */
    loadingElement?: ReactElement;
    /**
     * Button variant.
     */
    variant?: ButtonVariant;
    /**
     * Button size
     */
    size?: ButtonSize;
    /**
     * Button is full width
     */
    fullWidth?: boolean;
    /**
     * Button's style
     */
    style?: ButtonStyles;
    /**
     * Button sx
     */
    sx?: SX<ButtonStyles>;
    /**
     * Button's text content
     */
    children?: ReactNode;
    /**
     * Display icon to the right of the text
     */
    rightIcon?: ReactElement;
    /**
     * Display icon to the left of the text
     */
    leftIcon?: ReactElement;
}
