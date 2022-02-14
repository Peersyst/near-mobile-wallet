import { ButtonProps as ButtonBaseProps} from "../../base/input/Button/Button.types";


export type ButtonType = "light" | "dark";

export interface ButtonRootProps {
    type: ButtonType;
}