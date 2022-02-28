import { ReactElement } from "react";
import { TransitionDuration } from "../../util/Animated";
import { ViewStyle } from "react-native";

export interface BackdropProps {
    /**
     * Backdrop is open
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
     * Backdrop is open on mount
     */
    defaultOpen?: boolean;
    /**
     * Backdrop is closable
     */
    closable?: boolean;
    /**
     * Backdrop is transparent
     */
    transparent?: boolean;
    /**
     * Backdrop style
     */
    style?: ViewStyle;
    /**
     * Custom transition's duration
     */
    transitionsDuration?: TransitionDuration;
    /**
     * Backdrop content
     */
    children?: ReactElement;
}

export type ForwardedBackdropProps = Pick<BackdropProps, "defaultOpen" | "open" | "onClose" | "onExited" | "closable">;

export type ExposedBackdropProps = Pick<BackdropProps, "style" | "transitionsDuration" | "transparent">;
