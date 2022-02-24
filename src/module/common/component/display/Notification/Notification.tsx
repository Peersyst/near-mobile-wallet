import { AppearanceProps } from "module/common/types";
import { AlertCircle, NotificationRoot, NotificationIcon } from "./Notification.styles";

export interface NotificationProps extends AppearanceProps {
    hasNotifications?: boolean;
}

const Notification = ({ hasNotifications, appearance }: NotificationProps): JSX.Element => {
    return (
        <NotificationRoot>
            <NotificationIcon appearance={appearance} />
            <AlertCircle testID={"activeCircle"} appearance={appearance} hasNotifications={hasNotifications} />
        </NotificationRoot>
    );
};

export default Notification;
