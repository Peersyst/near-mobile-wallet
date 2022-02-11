import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { LogoIcon } from "icons";

export const TextLogoRoot = styled(View)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}))

export const TextLogoIcon = styled(LogoIcon)(({ theme }) => ({
    color: theme.palette.black,
    fontSize: 37
}))

export const TextRoot = styled(View)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
}))

export const TextLogoFont = styled(Text)(() => ({
    fontSize: 23,
    textTransform: "uppercase",
}))

