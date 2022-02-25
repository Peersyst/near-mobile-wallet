export type TransitionDuration = number | { enter: number; exit: number };

export type TransitionDelay = number | { enter: number; exit: number };

export interface AnimatedConfig {
    easing?: ((value: number) => number) | undefined;
    duration?: TransitionDuration;
    delay?: TransitionDelay;
    unmountOnExit?: boolean;
    onEnter?: () => unknown;
    onEntered?: () => unknown;
    onExit?: () => unknown;
    onExited?: () => unknown;
}

export interface AnimatedProps extends AnimatedConfig {
    in: boolean;
}
