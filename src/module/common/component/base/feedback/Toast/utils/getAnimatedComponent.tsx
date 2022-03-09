import { ToastAnimation, ToastContainer, ToastContainerStylesProps } from "module/common/component/base/feedback/Toast";
import { ComponentType } from "react";
import { Animated, AnimatedProps } from "react-native-components";
import { SlideProps } from "module/common/component/base/util/Animated/Slide";

const FadingToast = Animated.createAnimatedComponent.fade(ToastContainer);
const ScalingToast = Animated.createAnimatedComponent.scale(ToastContainer);
const SlidingToast = Animated.createAnimatedComponent.slide(ToastContainer);
const FadingSlideToast = Animated.createAnimatedComponent.fadingSlide(ToastContainer);
const FadingScaleToast = Animated.createAnimatedComponent.fadingScale(ToastContainer);

export default function getAnimatedComponent(
    animation: ToastAnimation,
): ComponentType<(AnimatedProps | SlideProps) & ToastContainerStylesProps> {
    switch (animation) {
        case "fade":
            return FadingToast;
        case "scale":
            return ScalingToast;
        case "slide":
            return SlidingToast;
        case "fadingSlide":
            return FadingSlideToast;
        case "fadingScale":
            return FadingScaleToast;
    }
}
