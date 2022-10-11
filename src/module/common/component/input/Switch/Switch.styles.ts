import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";

export const SwitchTrack = styled(Animated.View)(() => ({
    height: 24,
    width: 38,
    padding: 5,
    borderRadius: 2000,
}));

export const SwitchWrapper = styled(View)(() => ({
    height: "100%",
    width: "100%",
}));

export const SwitchElementWrapper = styled(Animated.View)(() => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    zIndex: 1,
    flexDirection: "row",
}));

export const SwitchThumb = styled(Animated.View)(() => ({
    height: "100%",
    width: "50%",
    borderRadius: 2000,
}));
