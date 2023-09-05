import { IconButton, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ActionableRoot = styled(Row)(() => ({
    alignItems: "center",
    justifyContent: "center",
}));

export const ActionableIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette.gray[300],
}));
