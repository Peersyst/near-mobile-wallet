import { AnimatedConfig, AnimatedProps } from "module/common/component/base/util/Animated";

export type SlideDirection = "up" | "right" | "down" | "left";

export interface SlideConfig extends AnimatedConfig {
    direction?: SlideDirection;
}

export interface SlideProps extends AnimatedProps {
    direction?: SlideDirection;
}
