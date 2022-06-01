import { ButtonProps } from "../Button/Button.types";

export interface CountdownButtonProps extends ButtonProps {
    seconds: number;
    onCountdownEnd?: () => any;
}
