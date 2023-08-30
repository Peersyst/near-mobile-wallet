import { Icon } from "@peersyst/react-native-components";
import styled, { styledWithAs } from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";

export const ActionDetailIcon = styledWithAs(Icon)(({ theme }) => ({
    color: theme.palette.gray[300],
    fontSize: 28,
}));

export const ActionDetailContent = styled(Typography, { variant: "body2Strong" })(({ theme }) => ({
    color: theme.palette.primary,
}));
