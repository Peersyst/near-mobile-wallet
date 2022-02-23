import { AlertCircle, NotificationRoot, NotificationIcon } from "./Notification.styles";

export interface NotificationProps {
    hasNotifications?: boolean;
}

const Notification = ({ hasNotifications }: NotificationProps): JSX.Element => {
    return (
        <NotificationRoot>
            <NotificationIcon color="black" />
            <AlertCircle testID={"activeCircle"} hasNotifications={hasNotifications} />
        </NotificationRoot>
    );
};

export default Notification;
