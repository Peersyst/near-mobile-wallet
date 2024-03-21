import { TextStyle } from "react-native";
import { AlertCircle, NotificationIconRoot } from "./NotificationIcon.styles";
import { ReactElement } from "react";

export interface NotificationIconProps {
    hasNotifications?: boolean;
    style?: TextStyle;
    icon: ReactElement;
}

const NotificationIcon = ({ hasNotifications, icon, style }: NotificationIconProps): JSX.Element => {
    return (
        <NotificationIconRoot style={style}>
            {icon}
            {hasNotifications && <AlertCircle testID={"activeCircle"} hasNotifications={hasNotifications} />}
        </NotificationIconRoot>
    );
};

export default NotificationIcon;
