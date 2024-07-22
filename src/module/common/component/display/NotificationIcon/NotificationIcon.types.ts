import { ViewStyle } from "react-native";
import { ReactElement } from "react";

export interface NotificationIconProps {
    hasNotifications?: boolean;
    style?: ViewStyle;
    icon: ReactElement;
}
