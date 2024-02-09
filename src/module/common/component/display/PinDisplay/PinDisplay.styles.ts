import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";
import { Animated } from "react-native";
import { classify, alpha } from "@peersyst/react-utils";
import Typography from "../Typography/Typography";

export const PinDisplayRoot = styled(Animated.createAnimatedComponent(classify(Row)), { gap: 48, alignItems: "center" })(() => ({
    height: 20,
}));

export const Placeholder = styled(Typography)(({ theme }) => ({
    color: alpha(theme.palette.white, 0.6),
}));
