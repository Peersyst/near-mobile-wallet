import styled from "@peersyst/react-native-styled";
import { Animated, Pressable } from "react-native";
import { classify } from "@peersyst/react-utils";
import { LinearGradient } from "expo-linear-gradient";

export const GradientChipRoot = styled(Pressable)(() => ({}));

export const GradientChipBackgroundGradiend = styled(Animated.createAnimatedComponent(classify(LinearGradient)))(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    elevation: -1,
    width: "100%",
    height: "100%",
    borderRadius: 10000,
}));
