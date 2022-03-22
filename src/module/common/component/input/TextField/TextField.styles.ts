import styled from "@peersyst/react-native-styled";
import TextField from "module/common/component/base/input/TextInput/TextField";
import { InputStyle, TextInputStyles } from "react-native-components";

export type TextFieldVariant = "elevated" | "underlined";
export type TextFieldSize = "md" | "lg";

export interface TextFieldRootProps {
    variant?: TextFieldVariant;
    size?: TextFieldSize;
}

export const TextFieldRoot = styled(TextField)<TextFieldRootProps>(({ theme, variant = "elevated", size = "md" }) => {
    const inputSizeStyles: Record<TextFieldSize, InputStyle> = {
        md: {
            height: 45,
        },
        lg: {
            height: 60,
            fontSize: 32,
        },
    };

    const commonStyles: TextInputStyles = {
        input: {
            ...inputSizeStyles[size],
            placeholderColor: theme.palette.darkGray,
            highlightColor: theme.palette.text,
        },
    };
    const { input: commonInputStyles, ...commonRestStyles } = commonStyles;

    const elevatedStyle: TextInputStyles = {
        ...commonStyles,
        borderRadius: 45,
        backgroundColor: theme.palette.lighterGray,
        borderColor: "transparent",
        focused: {
            borderColor: "transparent",
        },
        ...theme.shadows[7],
    };

    const underlinedStyle: TextInputStyles = {
        ...commonRestStyles,
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: theme.palette.darkGray2,
        borderRadius: 0,
        borderBottomWidth: 1.4,
        paddingHorizontal: 0,
        input: {
            ...commonInputStyles,
            color: theme.palette.darkGray2,
        },
        hint: {
            fontSize: 14,
        },
        error: {
            fontSize: 14,
        },
    };

    const variantStyles: Record<TextFieldVariant, TextInputStyles> = {
        elevated: elevatedStyle,
        underlined: underlinedStyle,
    };

    return variantStyles[variant];
});
