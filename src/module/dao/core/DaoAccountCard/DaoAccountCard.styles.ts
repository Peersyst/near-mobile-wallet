import styled from "@peersyst/react-native-styled";
import { ImageBackground } from "react-native";
import { Col, IconButton, Typography } from "react-native-components";

export const DaoCardRoot = styled(ImageBackground, { imageStyle: { borderRadius: 20 } })(() => ({
    padding: 20,
    overflow: "hidden",
    height: 200,
}))

export const DaoCardContent = styled(Col)(() => ({
    height: "100%"
}))

export const DaoCardIcon = styled(IconButton)(({ theme }) => ({
    fontSize: 25,
    color: theme.palette.white
}))

export const HeaderTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold"
}))