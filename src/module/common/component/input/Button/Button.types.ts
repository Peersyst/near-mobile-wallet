import { ButtonProps as ButtonBaseProps } from "../../base/input/Button/Button.types";

export type ButtonType = "light" | "dark";

export interface ButtonProps extends ButtonBaseProps {
    type?: ButtonType;
}
export interface ButtonRootProps {
    type: ButtonType;
}
export interface ButtonSXProps {
    type: ButtonType;
}
