import { ComponentType, useRef } from "react";
import { Animated } from "react-native";
import { classify } from "@peersyst/react-utils";
import useAnimatedTiming from "module/common/component/base/util/Animated/hooks/useAnimatedTiming";
import { SlideConfig, SlideProps } from "module/common/component/base/util/Animated/Slide";
import getExitedPosition from "./utils/getExitedPosition";

export default function fadingSlide<P extends { style?: any }>(
    Component: ComponentType<P>,
    {
        duration: configDuration = 500,
        delay: configDelay = 0,
        easing: configEasing,
        unmountOnExit: configUnmountOnExit = false,
        onEnter: configOnEnter,
        onEntered: configOnEntered,
        onExit: configOnExit,
        onExited: configOnExited,
        appear: configAppear = false,
        direction: configDirection,
    }: SlideConfig = {},
): ComponentType<P & SlideProps> {
    const AnimatedComponent = Animated.createAnimatedComponent(classify(Component));

    const FadingSlide = ({
        duration = configDuration,
        delay = configDelay,
        easing = configEasing,
        unmountOnExit = configUnmountOnExit,
        in: inProp,
        appear = configAppear,
        onEnter = configOnEnter,
        onEntered = configOnEntered,
        onExit = configOnExit,
        onExited = configOnExited,
        style: { opacity = 1, ...style } = {},
        direction = configDirection,
        ...rest
    }: P & SlideProps): JSX.Element => {
        const [startPos, endPos] = appear ? [0, opacity] : [opacity, 0];
        const fadeAnim = useRef(new Animated.Value(inProp ? startPos : endPos)).current;
        const exitPos = getExitedPosition(direction || "left");
        const slideAnim = fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [exitPos, 0],
        });

        const { mounted } = useAnimatedTiming(inProp, fadeAnim, {
            toValue: { enter: opacity, exit: 0 },
            duration,
            delay,
            easing,
            onEnter,
            onEntered,
            onExit,
            onExited,
            unmountOnExit,
        });

        return mounted ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <AnimatedComponent
                style={{
                    ...style,
                    opacity: fadeAnim,
                    transform: [{ [direction === "left" || direction === "right" ? "translateX" : "translateY"]: slideAnim }],
                }}
                {...rest}
            />
        ) : (
            <></>
        );
    };

    return FadingSlide;
}
