import { ButtonProps as ButtonBaseProps, ButtonStyle } from "../../base/input/Button/Button.types";

export type ButtonAppearance = "light" | "dark";

export interface ButtonProps extends ButtonBaseProps {
    appearence?: ButtonAppearance;
}
export interface ButtonRootProps {
    appearence: ButtonAppearance;
}

export type ButtonStates = "outlined" | "pressed";

export type ButtonAppeareanceStyle = Record<ButtonAppearance, ButtonStyle>

export type GetVariantStyleProps = Record<ButtonStates, ButtonAppeareanceStyle>
