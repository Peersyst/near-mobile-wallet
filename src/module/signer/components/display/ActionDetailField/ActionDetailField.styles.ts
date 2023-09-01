import { ElementStyler } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ActionDetailIcon = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.gray[300],
    fontSize: 28,
}));

export const ActionDetailContent = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.primary,
}));
