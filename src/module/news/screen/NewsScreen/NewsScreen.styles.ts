import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Col } from "react-native-components";

export const NewsScreenRoot = styled(Col, { gap: "5%" })(() => ({
    paddingHorizontal: "5%",
    paddingBottom: "10%",
}))

export const NewsSpacer = styled(View)(()=>({
    height: "3%",
    width: "100%"
}))
