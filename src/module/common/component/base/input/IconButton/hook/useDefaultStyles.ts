import { useTheme } from "@peersyst/react-native-styled";
import { IconButtonStyle } from "../IconButton.types";

export interface UseDefaultStylesResult {
    defaultStyles: IconButtonStyle;
    defaultDisabledStyles: IconButtonStyle;
    defaultPressedStyles: IconButtonStyle;
}

export default function useDefaultStyles(): UseDefaultStylesResult {
    const theme = useTheme();

    const defaultStyles: IconButtonStyle = {
        color: theme.palette.text,
    };

    const defaultDisabledStyles: IconButtonStyle = {
        color: theme.palette.disabled,
    };

    const defaultPressedStyles: IconButtonStyle = {
        opacity: 0.5,
    };

    return { defaultStyles, defaultDisabledStyles, defaultPressedStyles };
}
