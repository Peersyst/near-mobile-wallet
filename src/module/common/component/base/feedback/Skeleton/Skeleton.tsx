import { SkeletonProps } from "module/common/component/base/feedback/Skeleton/Skeleton.types";
import { SkeletonAnimation, SkeletonOverlay, SkeletonRoot } from "./Skeleton.styles";
import { cloneElement, useEffect, useRef } from "react";
import { Animated } from "react-native";

const Skeleton = ({ width, height, shape = "stadium", loading = true, appearance, style, children: child }: SkeletonProps): JSX.Element => {
    const { style: childStyle = {}, ...childrenProps } = child ? child.props : {};

    const skeletonAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(skeletonAnimation, {
                    toValue: 1,
                    duration: 750,
                    useNativeDriver: true,
                }),
                Animated.timing(skeletonAnimation, {
                    toValue: 0,
                    duration: 750,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: -1 },
        ).start();
    }, [skeletonAnimation]);

    return loading ? (
        <SkeletonRoot shape={shape} height={height} width={width}>
            <SkeletonOverlay appearance={appearance} />
            <SkeletonAnimation appearance={appearance} style={{ opacity: skeletonAnimation, ...style }} />
            {child && cloneElement(child, { ...childrenProps, style: { ...childStyle, opacity: 0 } })}
        </SkeletonRoot>
    ) : (
        <>{child}</>
    );
};

export default Skeleton;
