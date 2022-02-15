import { Pressable, Animated } from "react-native";
import styled from "@peersyst/react-native-styled";
import { RippleAnimCircleProps, RippleColor } from "./RippleAnimCircle.types";

export const RippleAnimCircleRoot = styled(Pressable)<Pick<RippleAnimCircleProps, "size" | "zIndex">>(({ size, zIndex }) => ({
    zIndex: zIndex || 2,
    position: "absolute",
    backgroundColor: "transparent",
    width: size || 50,
    height: size || 50,
    /* Center the circle correctly */
    top: size ? size * 0.04 : 2,
}))

export const Ripple = styled(Animated.View)<RippleColor>(({ size, color }) => ({
    position: "absolute",
    width: size || 50,
    height: size || 50,
    borderRadius: 50,
    backgroundColor: color || "white",
}))