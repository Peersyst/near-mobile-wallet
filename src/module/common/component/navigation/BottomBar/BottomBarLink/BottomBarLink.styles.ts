import styled from "@peersyst/react-native-styled";
import { Icon, Typography } from "react-native-components";

export const LinkText = styled(Typography)(({ theme })=> ({
    color: theme.palette.lighterGray,
}))

export const LinkIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.lighterGray,
    fontSize: 13,
}));