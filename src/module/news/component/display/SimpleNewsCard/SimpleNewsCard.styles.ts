import styled from "@peersyst/react-native-styled";
import { Paper, Typography } from "react-native-components";
import { Image, View } from "react-native";

export const SimpleNewsCardRoot = styled(Paper)(({ dimensions }) => ({
    padding: dimensions.width * 0.05,
    minHeight: 120,
}))

export const NewsImage = styled(Image)(({ theme, dimensions }) => ({
    width: dimensions.width * 0.25,
    height: dimensions.width * 0.25,
    backgroundColor: theme.palette.lightGray,
    borderRadius: 15,
}))

export const TextCont = styled(View)(({ dimensions }) => ({
    width: dimensions.width * 0.5
}))

export const NewTitle = styled(Typography, { numberOfLines: 4 })(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.darkGray,
}))

export const NewDate = styled(Typography)(({ theme }) => ({
    color: theme.palette.darkGray,
    position: "absolute",
    right: "7%",
    bottom: "12%"
}))