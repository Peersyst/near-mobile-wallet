import styled from "@peersyst/react-native-styled";
import { Icon, Typography } from "react-native-components";

export const LinkText = styled(Typography, { textAlign: "center" })(({ theme }) => ({
    color: theme.palette.darkGray,
}))

export const LinkIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.darkGray,
    fontSize: 24,
}));