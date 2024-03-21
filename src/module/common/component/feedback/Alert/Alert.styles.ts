import styled from "@peersyst/react-native-styled";
import { Alert } from "@peersyst/react-native-components";
import { AlertProps } from "./Alert";
import { alpha } from "@peersyst/react-utils";

export const AlertRoot = styled(Alert)<AlertProps>(({ theme: { palette }, type, color }) => {
    const statusColor = type && type !== "loading" ? palette.status[type] : palette.background;
    const currentColor = color ? palette[color] : statusColor;
    return {
        borderRadius: 8,
        icon: {
            color: currentColor,
        },
        backgroundColor: alpha(currentColor as string, 0.12),
        color: currentColor,
    };
});
