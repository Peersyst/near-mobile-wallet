import styled from "@peersyst/react-native-styled";
import { Alert, AlertProps } from "@peersyst/react-native-components";
import { alpha } from "@peersyst/react-utils";

export const AlertRoot = styled(Alert)<AlertProps>(({ theme: { palette }, type }) => {
    const statusColor = type && type !== "loading" ? palette.status[type] : palette.background;
    return {
        color: statusColor,
        backgroundColor: alpha(statusColor, 0.12),
    };
});
