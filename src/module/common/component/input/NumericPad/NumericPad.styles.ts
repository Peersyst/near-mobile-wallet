import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";
import { NumericPadRootProps } from "module/common/component/input/NumericPad/NumericPad.types";

export const NumericPadRoot = styled(Col, { flex: 1, gap: "16%" })<NumericPadRootProps>(({ safeAreaInsets, dimensions, belowLogo }) => ({
    paddingBottom: safeAreaInsets.bottom + 10,
    paddingTop: belowLogo ? dimensions.height * 0.325 : 0,
}));
