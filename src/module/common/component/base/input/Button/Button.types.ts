import { StyleProp, ViewStyle, TextStyle, ButtonProps as NativeButtonProps } from "react-native";
import { ReactElement, ReactNode } from "react";
import { SX } from "@peersyst/react-native-styled";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonVariant = "contained" | "text" | "outlined";

export type ButtonStyle = StyleProp<ViewStyle> & StyleProp<TextStyle>;

export interface ButtonRootProps {
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth: boolean;
    pressed: boolean;
    disabled: boolean;
}

export interface ButtonContainerProps {
    isLoading: boolean;
}

export interface ButtonTextProps {
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
}

export interface ButtonIconProps {
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    children: ReactElement;
}

export interface ButtonSxProps {
    variant: ButtonVariant;
    size: ButtonSize;
    pressed: boolean;
    disabled: boolean;
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
    loadingElement?: ReactNode;
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
    style?: StyleProp<ButtonStyle>;
    /**
     * Button sx
     */
    sx?: SX<ButtonSxProps, ButtonStyle>;
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
