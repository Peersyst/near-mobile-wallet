import { SX } from "@peersyst/react-native-styled";
import { ButtonProps as ButtonBaseProps, ButtonStyles} from "../../base/input/Button/Button.types";

export type ButtonType = "light" | "dark";

export interface ButtonProps extends Omit<ButtonBaseProps, "sx">{
    sx: SX<ButtonSXProps, ButtonStyles>;
    type: ButtonType;
}
export interface ButtonRootProps {
    type: ButtonType;
}
export interface ButtonSXProps {
    type: ButtonType;
}