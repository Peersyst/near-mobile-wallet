import { NotificationIcon } from "icons";
import { AlertCircle, NotificationRoot } from "./Notification.styles";

export interface NotificationProps {
    hasNotifications?: boolean;
}

const Notification = ({ hasNotifications }: NotificationProps): JSX.Element => {
    return (
        <NotificationRoot>
            <NotificationIcon />
            <AlertCircle testID={"activeCircle"} hasNotifications={hasNotifications} />
        </NotificationRoot>
    );
};

export default Notification;
