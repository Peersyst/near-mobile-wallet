import { Row } from "../../layout/Row";
import { ButtonContainerProps, ButtonRootProps, ButtonSize, ButtonStyle, ButtonTextProps, ButtonVariant } from "./Button.types";
import { StyleProp, View, Text } from "react-native";
import styled from "@peersyst/react-native-styled";
import { Theme } from "react-native-components";
import { alpha, darken } from "@peersyst/react-utils";

const rootVariantStyles = (variant: ButtonVariant, pressed: boolean, disabled: boolean, theme: Theme): StyleProp<ButtonStyle> => {
    switch (variant) {
        case "contained":
            return {
                backgroundColor: disabled ? theme.palette.disabled : pressed ? darken(theme.palette.primary, 0.1) : theme.palette.primary,
            };
        case "outlined":
            return {
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: disabled ? theme.palette.disabled : theme.palette.primary,
                backgroundColor: pressed ? alpha(theme.palette.primary, 0.2) : "transparent",
            };
        case "text":
            return {
                backgroundColor: pressed ? alpha(theme.palette.primary, 0.2) : "transparent",
            };
    }
};

/**
 * Sets height and padding depending on the size of the button
 */
const rootSizeStyles: Record<ButtonSize, StyleProp<ButtonStyle>> = {
    sm: {
        paddingHorizontal: 10,
        height: 32,
    },
    md: {
        paddingHorizontal: 12,
        height: 40,
    },
    lg: {
        paddingHorizontal: 14,
        height: 48,
    },
};

/**
 * Sets height and padding depending on the size of the button
 */
export const textSizeStyles: Record<ButtonSize, StyleProp<ButtonStyle>> = {
    sm: {
        fontSize: 13,
    },
    md: {
        fontSize: 14,
    },
    lg: {
        fontSize: 15,
    },
};

export const textVariantStyles = (variant: ButtonVariant, disabled: boolean, theme: Theme): StyleProp<ButtonStyle> => {
    if (disabled) return { color: theme.palette.disabled };
    switch (variant) {
        case "contained":
            return {
                color: theme.palette.text,
            };
        case "outlined":
        case "text":
            return {
                color: theme.palette.primary,
            };
    }
};

/**
 * Container for the loader
 */
export const ButtonLoader = styled(Row, { alignItems: "center", justifyContent: "center" })(() => ({ position: "absolute" }));

/**
 * Main button styles
 */
export const ButtonRoot = styled(View)<ButtonRootProps>(({ variant, theme, fullWidth, size, pressed, disabled }) => ({
    alignItems: "center",
    justifyContent: "center",
    alignSelf: fullWidth ? undefined : "flex-start",
    borderRadius: theme.borderRadius,
    ...(rootSizeStyles[size] as object),
    ...(rootVariantStyles(variant, pressed, disabled, theme) as object),
}));

export const ButtonContent = styled(Row, { gap: 16, alignItems: "center", justifyContent: "center" })<ButtonContainerProps>(
    ({ isLoading }) => ({
        opacity: isLoading ? 0 : 1,
    }),
);

export const ButtonText = styled(Text)<ButtonTextProps>(({ theme, size, variant, disabled }) => ({
    ...(textSizeStyles[size] as object),
    ...(textVariantStyles(variant, disabled, theme) as object),
}));
