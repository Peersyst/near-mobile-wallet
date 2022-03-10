import { ReactElement } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export type ToastPosition = "top" | "bottom";

export type ToastType = "info" | "success" | "error" | "warning" | "loading";

export type ToastAnimation = "fade" | "scale" | "slide" | "fadingSlide" | "fadingScale";

export type ToastStyle = ViewStyle & TextStyle;

export interface ToastProps {
    /**
     * Toast message
     */
    message: string;
    /**
     * Toast type
     */
    type?: ToastType;
    /**
     * Toast actions
     */
    action?: ReactElement;
    /**
     * Toast position
     */
    position?: ToastPosition;
    /**
     * Toast is open
     */
    open?: boolean;
    /**
     * onClose handler
     */
    onClose?: () => unknown;
    /**
     * onExited handler
     */
    onExited?: () => unknown;
    /**
     * Toast animation
     */
    animation?: ToastAnimation;
    /**
     * Toast duration, infinity for type = loading
     */
    duration?: number;
    /**
     * Toast style
     */
    style?: ToastStyle;
}

export interface ToastContainerStylesProps {
    position: ToastPosition;
    safeAreaInsets: EdgeInsets;
}

export interface ToastContentStylesProps {
    type?: ToastType;
}
