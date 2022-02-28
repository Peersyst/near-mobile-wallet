import { ReactNode } from "react";
import { ExposedBackdropProps } from "../Backdrop";
import { Elevation } from "../../surface/Paper";
import { TransitionDuration } from "../../util/Animated";
import { ViewStyle } from "react-native";

export type ModalAnimation = "fade" | "from-bottom";

export interface ModalProps {
    /**
     * Modal is open on mount
     */
    defaultOpen?: boolean;
    /**
     * Modal's open state
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
     * Modal is closable
     */
    closable?: boolean;
    /**
     * Modal elevation
     */
    elevation?: Elevation;
    /**
     * Modal style
     */
    style?: ViewStyle;
    /**
     * Modal animation
     */
    animation?: ModalAnimation;
    /**
     * Custom transition's duration
     */
    transitionsDuration?: TransitionDuration;
    /**
     * Backdrop props
     */
    BackdropProps?: ExposedBackdropProps;
    /**
     * Modal content
     */
    children?: ReactNode;
}
