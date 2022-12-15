import { Icon } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const SwitchThemeIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 13,
}));
