import { ButtonProps } from "../Button/Button.types";

export interface CountdownButtonProps extends ButtonProps {
    /**
     * The time in milliseconds to count down from.
     */
    countdownTime: number;
    onCountdownEnd?: () => any;
}
