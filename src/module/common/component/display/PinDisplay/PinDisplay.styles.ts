import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";
import { Animated } from "react-native";
import { classify } from "@peersyst/react-utils";

export const PinDisplayRoot = styled(Animated.createAnimatedComponent(classify(Row)), { gap: 48, alignItems: "center" })(() => ({
    minHeight: 20,
}));
