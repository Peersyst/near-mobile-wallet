import styled from "@peersyst/react-native-styled";
import { Col } from "../../base/layout/Col";
import { NumericPadStyle } from "./NumericPad.types";

export const NumericPadRoot = styled(Col, { justifyContent: "space-between", alignItems: "center" })<NumericPadStyle>((style) => ({
    ...style,
}));
