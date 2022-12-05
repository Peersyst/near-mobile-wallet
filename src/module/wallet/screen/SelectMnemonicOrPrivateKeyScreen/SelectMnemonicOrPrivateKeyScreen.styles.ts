import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const SelectMnemonicOrPrivateKeyScreenRoot = styled(Col, { gap: "5%" })(({ theme, dimensions }) => {
    return {
        flex: 1,
        minHeight: dimensions.height * 0.75,
    };
});
