import { useTheme } from "@peersyst/react-native-styled";
import { ButtonSizeStyle, ButtonStyleWithVariant } from "../Button.types";
import { alpha, darken, emphasize } from "@peersyst/react-utils";

export interface UseDefaultStylesResult {
    defaultStyles: ButtonStyleWithVariant;
    defaultDisabledStyles: ButtonStyleWithVariant;
    defaultPressedStyles: ButtonStyleWithVariant;
    defaultSizeStyles: ButtonSizeStyle;
}

export default function (): UseDefaultStylesResult {
    const theme = useTheme();

    const defaultStyles: ButtonStyleWithVariant = {
        backgroundColor: "transparent",
        color: theme.palette.primary,
        contained: {
            backgroundColor: theme.palette.primary,
            color: theme.palette.text,
        },
        outlined: {
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: theme.palette.primary,
        },
        text: {
            borderColor: "transparent"
        }
    };

    const defaultDisabledStyles: ButtonStyleWithVariant = {
        color: theme.palette.disabled,
        contained: {
            backgroundColor: theme.palette.disabled,
            color: emphasize(theme.palette.disabled, 0.5),
        },
        outlined: {
            borderColor: theme.palette.disabled,
        },
    };

    const defaultPressedStyles: ButtonStyleWithVariant = {
        backgroundColor: alpha(theme.palette.primary, 0.2),
        contained: {
            backgroundColor: darken(theme.palette.primary, 0.1),
        },
        text: {
            backgroundColor: "transparent",
            textDecorationLine: "underline",
        }
    };

    const defaultSizeStyles: ButtonSizeStyle = {
        sm: {
            paddingHorizontal: 10,
            height: 32,
            fontSize: 13,
        },
        md: {
            paddingHorizontal: 12,
            height: 40,
            fontSize: 14,
        },
        lg: {
            paddingHorizontal: 14,
            height: 48,
            fontSize: 15,
        },
    };

    return { defaultStyles, defaultDisabledStyles, defaultPressedStyles, defaultSizeStyles };
}
