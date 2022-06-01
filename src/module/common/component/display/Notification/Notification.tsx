import { NotificationIcon } from "icons";
import { AlertCircle, NotificationRoot } from "./Notification.styles";
import { TextStyle } from "react-native";

export interface NotificationProps {
    hasNotifications?: boolean;
    style?: TextStyle;
}

const Notification = ({ hasNotifications, style }: NotificationProps): JSX.Element => {
    return (
        <NotificationRoot>
            <NotificationIcon style={style} />
            <AlertCircle testID={"activeCircle"} hasNotifications={hasNotifications} />
        </NotificationRoot>
    );
};

export default Notification;
