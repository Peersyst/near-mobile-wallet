import { ButtonProps as ButtonBaseProps } from "../../base/input/Button/Button.types";

export type ButtonType = "light" | "dark";

export interface ButtonProps extends ButtonBaseProps {
    backgroundColor?: string;
    type?: ButtonType;
}
export interface ButtonRootProps {
    backgroundColor?: string;
    type: ButtonType;
}
export interface ButtonSXProps {
    type: ButtonType;
}
