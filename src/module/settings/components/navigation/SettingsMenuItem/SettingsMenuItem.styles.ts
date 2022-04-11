import styled from "@peersyst/react-native-styled";
import { Row, Typography } from "react-native-components";

export interface SettingsMenuItemTextProps {
    destructive: boolean;
}

export const SettingsMenuItemRoot = styled(Row, { alignItems: "center" })(() => ({
    height: 30,
}));

export const SettingsMenuItemText = styled(Typography)<SettingsMenuItemTextProps>(({ theme, destructive }) => ({
    color: destructive ? theme.palette.status.error : theme.palette.text,
}));
