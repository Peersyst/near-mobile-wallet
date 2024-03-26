import { View, ViewStyle } from "react-native";
import { AlertCircle } from "./NotificationIcon.styles";
import { ReactElement } from "react";

export interface NotificationIconProps {
    hasNotifications?: boolean;
    style?: ViewStyle;
    icon: ReactElement;
}

const NotificationIcon = ({ hasNotifications, icon, style }: NotificationIconProps): JSX.Element => {
    return (
        <View style={style}>
            {icon}
            {hasNotifications && <AlertCircle />}
        </View>
    );
};

export default NotificationIcon;
