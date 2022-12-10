import { Icon } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ValidIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.status.success,
}));

export const InvalidIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.status.error,
}));
