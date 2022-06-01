import { ComponentType, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, LayoutRectangle } from "react-native";
import { SlideConfig, SlideProps } from "./Slide.types";
import { classify } from "@peersyst/react-utils";
import getExitedPosition from "module/common/component/base/util/Animated/Slide/utils/getExitedPosition";
import useAnimatedTiming from "module/common/component/base/util/Animated/hooks/useAnimatedTiming";

export default function slide<P extends { style?: any; onLayout?: ((event: LayoutChangeEvent) => void) | undefined }>(
    Component: ComponentType<P>,
    {
        duration: configDuration = 500,
        delay: configDelay = 0,
        easing: configEasing,
        direction: directionConfig,
        appear: configAppear = false,
    }: SlideConfig = {},
): ComponentType<P & SlideProps> {
    const AnimatedComponent = Animated.createAnimatedComponent(classify(Component));

    const Slide = ({
        duration = configDuration,
        delay = configDelay,
        easing = configEasing,
        in: inProp,
        appear = configAppear,
        direction = directionConfig,
        style: { opacity = 1, ...style } = {},
        unmountOnExit = false,
        onEnter,
        onEntered,
        onExit,
        onExited,
        ...rest
    }: P & SlideProps): JSX.Element => {
        const [layout, setLayout] = useState<LayoutRectangle>();
        const handleLayout = ({ nativeEvent: { layout: eventLayout } }: LayoutChangeEvent): void => {
            if (!layout) setLayout(eventLayout);
        };

        const exitPos = getExitedPosition(layout, direction || "left");
        const [startPos, endPos] = appear ? [0, exitPos] : [exitPos, 0];
        const slideAnim = useRef(new Animated.Value(inProp ? endPos : startPos)).current;

        const { mounted } = useAnimatedTiming(inProp, slideAnim, {
            toValue: { enter: 0, exit: getExitedPosition(layout, direction || "left") },
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
                    transform: [{ [direction === "left" || direction === "right" ? "translateX" : "translateY"]: slideAnim }],
                    opacity: layout ? opacity : 0,
                }}
                onLayout={handleLayout}
                {...rest}
            />
        ) : (
            <></>
        );
    };

    return Slide;
}
