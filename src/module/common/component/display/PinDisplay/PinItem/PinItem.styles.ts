import styled from "@peersyst/react-native-styled";
import { Icon } from "@peersyst/react-native-components";

export interface PinItemRootProps {
    active: boolean;
}

export const PinItemRoot = styled(Icon)<PinItemRootProps>(({ theme, active }) => ({
    color: active ? theme.palette.text : theme.palette.overlay["12%"],
    fontSize: 5,
}));
