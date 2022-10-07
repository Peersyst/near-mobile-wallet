import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";
import { SwitchThumbProps, SwitchTrackStyle } from "./Switch.types";

export const SwitchThumb = styled(Animated.View)<SwitchThumbProps>(({ height, width, padding, backgroundColor }) => {
    console.log(backgroundColor);
    return {
        height: height ?? 24,
        width: width ?? 38,
        padding: padding ?? 5,
        backgroundColor: backgroundColor,
        borderRadius: 2000,
    };
});

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

export const SwitchTrack = styled(Animated.View)<SwitchTrackStyle>(({ backgroundColor }) => ({
    height: "100%",
    width: "50%",
    borderRadius: 2000,
    backgroundColor: backgroundColor,
}));
