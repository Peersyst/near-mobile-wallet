import { Appearance } from "module/common/types";
import { ButtonProps as ButtonBaseProps, ButtonStyle } from "../../base/input/Button/Button.types";

export interface ButtonProps extends ButtonBaseProps {
    appearance?: Appearance;
}

export type ButtonStates = "outlined" | "pressed" | "contained" | "pressedContained";

export type ButtonAppeareanceStyle = Partial<Record<Appearance, ButtonStyle>>;

export type GetVariantStyleProps = Record<ButtonStates, ButtonAppeareanceStyle>;

