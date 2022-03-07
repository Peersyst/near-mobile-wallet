import styled from "@peersyst/react-native-styled";
import { Animated } from "react-native";
import { AnimatedDotProps } from "./Slider.types";

export const AnimatedDot = styled(Animated.View)<AnimatedDotProps>(({ theme, color }) => ({
    backgroundColor: color || theme.palette.primary,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
}));
