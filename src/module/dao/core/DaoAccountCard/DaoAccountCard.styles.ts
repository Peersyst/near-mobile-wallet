import styled from "@peersyst/react-native-styled";
import { ImageBackground } from "react-native";
import { Col, IconButton, Typography } from "react-native-components";

export const DaoCardRoot = styled(ImageBackground, { imageStyle: { borderRadius: 20 } })(({theme}) => ({
    padding: 20,
    overflow: "hidden",
    height: 230,
    backgroundColor: theme.palette.gray,
    borderRadius:20,
}))

export const DaoCardContent = styled(Col, {justifyContent: "space-between"})(() => ({
    height: "100%"
}))

export const DaoCardIcon = styled(IconButton)(() => ({
    fontSize: 25,
}))
