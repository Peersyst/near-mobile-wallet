import { ButtonProps as BaseButtonProps, ButtonStyle } from "@peersyst/react-native-components";

export type ButtonAppearance = "light" | "dark" | "gray";

export interface ButtonRootProps {
    appearance: ButtonAppearance;
}

export interface ButtonProps extends BaseButtonProps {
    appearance?: ButtonAppearance;
}

export type ButtonStates = "outlined" | "pressed" | "filled" | "pressedFilled";

export type ButtonAppeareanceStyle = Partial<Record<ButtonAppearance, ButtonStyle>>;

export type GetVariantStyleProps = Record<ButtonStates, ButtonAppeareanceStyle>;
