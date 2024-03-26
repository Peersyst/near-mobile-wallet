import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";

export const PickWalletMnemonicScreenRoot = styled(Col, { gap: 24 })(({ safeAreaInsets }) => ({
    paddingBottom: safeAreaInsets.bottom + 20,
    height: "20%",
}));
