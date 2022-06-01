import { Image, Pressable, View } from "react-native";
import styled from "@peersyst/react-native-styled";

export const LogoImage = styled(Image)(() => ({
    width: "100%",
    height: "100%",
}));

export const PressableImageRoot = styled(Pressable)(() => ({
    width: "100%",
    height: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
}));

export const BomotBarLogoItemWrapper = styled(View)(({ theme }) => ({
    width: 70,
    height: 70,
    position: "absolute",
    zIndex: 2,
    top: -30,
    backgroundColor: theme.palette.background,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows[5],
}));

export const BottomBarLogoItemRoot = styled(View)(() => ({
    position: "relative",
    width: 70,
    height: "100%",
}));
