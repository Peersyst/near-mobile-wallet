import { useTheme } from "@peersyst/react-native-styled";
import { TextInputStyle } from "../TextInput.types";
import { TextStyle } from "react-native";
import { alpha } from "@peersyst/react-utils";

export interface UseDefaultStylesResult {
    defaultStyle: TextInputStyle;
    defaultInvalidStyle: TextInputStyle;
    defaultValidStyle: TextInputStyle;
    defaultFocusedStyle: TextInputStyle;
    defaultDisabledStyle: TextInputStyle;
    defaultErrorStyle: TextStyle;
    defaultHintStyle: TextStyle;
}

export default function useDefaultStyles(): UseDefaultStylesResult {
    const theme = useTheme();

    const defaultStyle: TextInputStyle = {
        borderColor: theme.palette.text,
        input: {
            color: theme.palette.text,
            fontSize: 14,
        },
    };

    const defaultInvalidStyle: TextInputStyle = {
        borderColor: theme.palette.status.error,
    };

    const defaultValidStyle: TextInputStyle = {
        borderColor: theme.palette.status.success,
    };

    const defaultFocusedStyle: TextInputStyle = {
        borderColor: theme.palette.primary,
    };

    const defaultDisabledStyle: TextInputStyle = {
        borderColor: theme.palette.disabled,
        input: {
            color: theme.palette.disabled,
        },
    };

    const defaultErrorStyle: TextStyle = {
        color: theme.palette.status.error,
        fontSize: 12,
    };

    const defaultHintStyle: TextStyle = {
        color: alpha(theme.palette.text, 0.5),
        fontSize: 12,
    };

    return {
        defaultStyle,
        defaultInvalidStyle,
        defaultValidStyle,
        defaultFocusedStyle,
        defaultDisabledStyle,
        defaultErrorStyle,
        defaultHintStyle,
    };
}
