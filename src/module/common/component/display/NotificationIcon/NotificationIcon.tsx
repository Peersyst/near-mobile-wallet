import { View } from "react-native";
import { AlertCircle } from "./NotificationIcon.styles";
import { NotificationIconProps } from "./NotificationIcon.types";

const NotificationIcon = ({ hasNotifications, icon, style }: NotificationIconProps): JSX.Element => {
    return (
        <View style={style}>
            {icon}
            {hasNotifications && <AlertCircle />}
        </View>
    );
};

export default NotificationIcon;
