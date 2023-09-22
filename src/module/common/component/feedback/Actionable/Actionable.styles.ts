import { ElementStyler } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ActionRoot = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.gray[300],
}));
