import styled from "@peersyst/react-native-styled";
import { ImageBackground } from "react-native";
import { Col } from "react-native-components";

export const DaoCardRoot = styled(ImageBackground, { imageStyle: { borderRadius: 20, minHeight:220 } })(({theme, dimensions}) => ({
    padding: "5%",
    overflow: "hidden",
    height: dimensions.height * 0.3,
    minHeight: 220,
    backgroundColor: theme.palette.gray,
    borderRadius:20,
}))

export const DaoCardContent = styled(Col, {justifyContent: "space-between"})(() => ({
    height: "100%"
}))

