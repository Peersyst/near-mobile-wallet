import styled from "@peersyst/react-native-styled";
import { Animated, Col } from "@peersyst/react-native-components";

export const AnimatedAuthSwitchScreenRoot = styled(Animated.createAnimatedComponent.fade(Col, { duration: 200 }), { gap: 20 })(
    ({ safeAreaInsets }) => ({
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        paddingBottom: safeAreaInsets.bottom + 40,
    }),
);
