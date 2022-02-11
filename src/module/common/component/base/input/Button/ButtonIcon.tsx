import { ButtonIconProps, textSizeStyles, textVariantStyles } from "react-native-components";
import { useTheme } from "@peersyst/react-native-styled";
import { cloneElement } from "react";

export const ButtonIcon = ({ size, variant, disabled, children: child }: ButtonIconProps): JSX.Element => {
    const theme = useTheme();
    const { style, ...rest } = child.props;

    return cloneElement(child, {
        ...rest,
        style: { ...(textSizeStyles[size] as object), ...(textVariantStyles(variant, disabled, theme) as object), ...style },
    });
};

export default ButtonIcon;
