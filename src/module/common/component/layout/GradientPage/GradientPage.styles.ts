import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";
import { classify } from "@peersyst/react-utils";
import { LinearGradient } from "expo-linear-gradient";

export const GradientPageRoot = styled(View)(() => ({
    flex: 1,
}));

export const GradientPageGradient = styled(Animated.createAnimatedComponent(classify(LinearGradient)))(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    elevation: -1,
    width: "100%",
    height: "100%",
}));
