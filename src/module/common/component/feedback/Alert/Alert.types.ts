import { CoreAlertProps } from "@peersyst/react-components-core";
import { TextStyle, ViewStyle } from "react-native";

export type AlertStyle = ViewStyle & TextStyle;

export interface AlertProps extends CoreAlertProps {
    /**
     * Alert style
     */
    style?: AlertStyle;
}
