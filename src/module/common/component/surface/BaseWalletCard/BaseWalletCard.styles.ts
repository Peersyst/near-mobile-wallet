import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const BaseWalletCardRoot = styled(Col, { flex: 1, gap: 20, alignItems: "center", justifyContent: "center" })(() => {
    return {
        width: "100%",
        height: "100%",
    };
});
