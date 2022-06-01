import { ReactNode } from "react";
import { ExposedBackdropProps } from "../Backdrop";
import { Elevation } from "../../surface/Paper";
import { ViewStyle } from "react-native";

export interface ModalProps extends ExposedBackdropProps {
    /**
     * Modal elevation
     */
    elevation?: Elevation;
    /**
     * Show the close button
     */
    showCloseButton?: boolean;
    /**
     * Modal style
     */
    style?: ViewStyle;
    /**
     * Modal content
     */
    children?: ReactNode;
}
