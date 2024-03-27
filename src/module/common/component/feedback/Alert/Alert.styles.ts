import styled from "@peersyst/react-native-styled";
import { Alert } from "@peersyst/react-native-components";
import { AlertProps } from "./Alert";
import { alpha } from "@peersyst/react-utils";

export const AlertRoot = styled(Alert)<AlertProps>(({ theme: { palette }, type }) => {
    const statusColor = type && type !== "loading" ? palette.status[type] : palette.background;
    return {
        borderRadius: 8,
        icon: {
            color: statusColor,
        },
        backgroundColor: alpha(statusColor as string, 0.12),
        color: statusColor,
    };
});
