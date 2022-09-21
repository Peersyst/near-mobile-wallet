import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";

export const WelcomeBackScreenRoot = styled(Row, { justifyContent: "center", alignItems: "flex-end" })(() => ({
    flex: 1,
    paddingBottom: "25%",
}));
