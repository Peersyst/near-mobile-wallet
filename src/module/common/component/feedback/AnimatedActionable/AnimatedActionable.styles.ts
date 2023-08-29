import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import Typography from "../../display/Typography/Typography";
import { Animated } from "react-native";

export const AnimatedActionableRoot = styled(Col)(() => ({}));

export const ActionableLabel = styled(Typography)(() => ({
    paddingHorizontal: 24,
}));

export const ActionRoot = styled(Animated.View)(() => ({
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
}));
