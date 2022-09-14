import styled from "@peersyst/react-native-styled";
import { Icon } from "@peersyst/react-native-components";

export const PinItemRoot = styled(Icon)(({ theme }) => ({
    color: theme.palette.text,
    fontSize: 13,
}));
