import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { NotificationProps } from "./Notification";
import { NotificationIcon as Icon } from "icons";
import { AppearanceProps } from "module/common/types";
import { getTextColor } from "utils/getTextColor";

export const NotificationRoot = styled(View)(() => ({
    position: "relative",
}));

export const AlertCircle = styled(View)<NotificationProps>(({ hasNotifications, theme, appearance }) => {
    return {
        position: "absolute",
        top: -2,
        right: -3,
        width: 12,
        height: 12,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: appearance === "light" ? theme.palette.white : theme.palette.black,
        backgroundColor: hasNotifications ? theme.palette.red : undefined,
    }
});

export const NotificationIcon = styled(Icon)<AppearanceProps>(({ theme, appearance }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
    }
});
