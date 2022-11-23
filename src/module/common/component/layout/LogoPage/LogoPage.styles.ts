import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";

export const LogoPageIconRoot = styled(Animated.createAnimatedComponent(View))(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
}));
