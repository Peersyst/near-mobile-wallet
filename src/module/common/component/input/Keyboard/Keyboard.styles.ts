import styled from "@peersyst/react-native-styled";
import { Col } from "react-native-components";

export const KeyboardRoot = styled(Col, { gap: 40, alignItems: "center" })(() => ({
    paddingBottom: 20,
    paddingHorizontal: 10,
}));
