import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";

export const NumericPadRoot = styled(Col, { flex: 1, gap: "16%" })(({ safeAreaInsets, dimensions }) => ({
    paddingBottom: safeAreaInsets.bottom + 10,
    paddingTop: dimensions.height * 0.325,
}));
