import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const BrowserScreenRoot = styled(Col)(({ theme, safeAreaInsets }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
}));
