import styled from "@peersyst/react-native-styled";
import { Animated } from "react-native";
import { classify } from "@peersyst/react-utils";
import { LinearGradient } from "expo-linear-gradient";
import { NearIcon } from "icons";

export const NearMobileLogoRoot = styled(Animated.createAnimatedComponent(classify(LinearGradient)))(({ theme }) => ({
    width: 76,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadiusSm,
}));

export const NearLogo = styled(NearIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 44,
}));
