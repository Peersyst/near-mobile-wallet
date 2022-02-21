import styled from "@peersyst/react-native-styled"
import { BackIcon as Icon } from "icons"
import { View } from "react-native"

export const NavbarRoot = styled(View)(() => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
}))

export const LeftRoot = styled(View)(() => ({
    position: "absolute",
    left: 0,
}))

export const RightRoot = styled(View)(() => ({
    position: "absolute",
    right: 0,
}))
