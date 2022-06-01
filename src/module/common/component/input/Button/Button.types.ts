import { ButtonProps as ButtonBaseProps, ButtonStyle } from "../../base/input/Button/Button.types";

export type ButtonAppearance = "light" | "dark" | "gray";

export interface ButtonAppearanceProps {
    appearance: ButtonAppearance;
}

export interface ButtonProps extends ButtonBaseProps {
    appearance?: ButtonAppearance;
}

export type ButtonStates = "outlined" | "pressed" | "contained" | "pressedContained";

export type ButtonAppeareanceStyle = Partial<Record<ButtonAppearance, ButtonStyle>>;

export type GetVariantStyleProps = Record<ButtonStates, ButtonAppeareanceStyle>;
