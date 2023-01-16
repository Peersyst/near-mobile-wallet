import styled from "@peersyst/react-native-styled";
import { Alert } from "@peersyst/react-native-components";
import { alpha } from "@peersyst/react-utils";

export const StakingAlertRoot = styled(Alert, { type: "success" })(({ theme }) => ({
    backgroundColor: alpha(theme.palette.green, 0.12),
    color: theme.palette.green,
}));
