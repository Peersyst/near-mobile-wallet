import styled from "@peersyst/react-native-styled";
import { ImageBackground } from "react-native";
import { Col } from "@peersyst/react-native-components";

export const DAOCardRoot = styled(ImageBackground, { imageStyle: { borderRadius: 20, minHeight: 220 } })(({ theme, dimensions }) => ({
    padding: "5%",
    overflow: "hidden",
    height: dimensions.height * 0.3,
    minHeight: 220,
    backgroundColor: theme.palette.gray[300],
    borderRadius: 20,
}));

export const DAOCardContent = styled(Col, { justifyContent: "space-between" })(() => ({
    height: "100%",
}));
