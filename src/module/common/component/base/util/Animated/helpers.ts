import { TransitionDelay, TransitionDuration } from "./Animated.types";

export function getDuration(duration: TransitionDuration, status: "enter" | "exit"): number {
    if (typeof duration === "number") return duration;
    else {
        if (status === "enter") return duration.enter;
        else return duration.exit;
    }
}

export function getDelay(delay: TransitionDelay, status: "enter" | "exit"): number {
    if (typeof delay === "number") return delay;
    else {
        if (status === "enter") return delay.enter;
        else return delay.exit;
    }
}
