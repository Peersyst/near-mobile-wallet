import { AnimatedConfig, AnimatedProps } from "module/common/component/base/util/Animated/Animated.types";
import { ComponentType, useRef } from "react";
import { Animated } from "react-native";
import { classify } from "@peersyst/react-utils";
import useAnimatedTiming from "module/common/component/base/util/Animated/hooks/useAnimatedTiming";

export default function fade<P extends { style?: any }>(
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
    }: AnimatedConfig = {},
): ComponentType<P & AnimatedProps> {
    const AnimatedComponent = Animated.createAnimatedComponent(classify(Component));

    const Fade = ({
        duration = configDuration,
        delay = configDelay,
        easing = configEasing,
        unmountOnExit = configUnmountOnExit,
        in: inProp,
        onEnter = configOnEnter,
        onEntered = configOnEntered,
        onExit = configOnExit,
        onExited = configOnExited,
        style: { opacity = 1, ...style } = {},
        ...rest
    }: P & AnimatedProps): JSX.Element => {
        const fadeAnim = useRef(new Animated.Value(inProp ? 0 : opacity)).current;

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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return mounted ? <AnimatedComponent style={{ ...style, opacity: fadeAnim }} {...rest} /> : <></>;
    };

    return Fade;
}
