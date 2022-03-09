import { ComponentType, useRef } from "react";
import { Animated } from "react-native";
import { classify } from "@peersyst/react-utils";
import useAnimatedTiming from "module/common/component/base/util/Animated/hooks/useAnimatedTiming";
import { SlideProps } from "module/common/component/base/util/Animated/Slide";
import { AnimatedProps, AnimatedConfig } from "../Animated.types";

export default function fadingScale<P extends { style?: any }>(
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
    }: AnimatedConfig = {},
): ComponentType<P & AnimatedProps> {
    const AnimatedComponent = Animated.createAnimatedComponent(classify(Component));

    const FadingScale = ({
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
        ...rest
    }: P & SlideProps): JSX.Element => {
        const [startPos, endPos] = appear ? [0, opacity] : [opacity, 0];
        const fadingScaleAnim = useRef(new Animated.Value(inProp ? startPos : endPos)).current;

        const { mounted } = useAnimatedTiming(inProp, fadingScaleAnim, {
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
                    opacity: fadingScaleAnim,
                    transform: [{ scale: fadingScaleAnim }],
                }}
                {...rest}
            />
        ) : (
            <></>
        );
    };

    return FadingScale;
}
