import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";
import { SwitchThumbStyle, SwitchTrackStyle } from "./Switch.types";

export const SwitchThumb = styled(View)<SwitchThumbStyle>(({ height, width, padding, backgroundColor }) => ({
    height: height ?? 24,
    width: width ?? 38,
    padding: padding ?? 5,
    backgroundColor: backgroundColor ?? "#fefefe",
    borderRadius: 2000,
}));

export const SwitchWrapper = styled(View)(() => ({
    height: "100%",
    width: "100%",
}));

export const SwitchElementWrapper = styled(Row, { alignItems: "center" })(() => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    zIndex: 1,
}));

export const SwitchTrack = styled(Animated.View)<SwitchTrackStyle>(({ backgroundColor, theme: { palette: p } }) => ({
    height: "100%",
    width: "50%",
    borderRadius: 2000,
    backgroundColor: backgroundColor ?? p.primary,
}));
