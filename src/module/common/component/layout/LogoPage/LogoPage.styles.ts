import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";

export const LogoPageIconRoot = styled(Animated.createAnimatedComponent(View))(() => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "20%",
}));
