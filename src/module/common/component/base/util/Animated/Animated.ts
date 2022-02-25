import { Animated as BaseAnimated } from "react-native";
import { ComponentType } from "react";
import { AnimatedConfig, AnimatedProps } from "module/common/component/base/util/Animated/Animated.types";
import { fade } from "./Fade";
import { slide, SlideConfig, SlideProps } from "./Slide";

export type CreateAnimatedComponent = typeof BaseAnimated.createAnimatedComponent & {
    fade: <T>(Component: ComponentType<T>, config?: AnimatedConfig) => ComponentType<T & AnimatedProps>;
    slide: <T>(Component: ComponentType<T>, config?: SlideConfig) => ComponentType<T & SlideProps>;
};

const createAnimatedComponent: CreateAnimatedComponent = BaseAnimated.createAnimatedComponent as CreateAnimatedComponent;
createAnimatedComponent.fade = fade;
createAnimatedComponent.slide = slide;

const Animated = { ...BaseAnimated, createAnimatedComponent };

export default Animated;
