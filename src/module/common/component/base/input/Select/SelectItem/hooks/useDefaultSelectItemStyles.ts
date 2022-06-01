import { TextStyle, ViewStyle } from "react-native";
import { useTheme } from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";

export interface UseDefaultSelectItemStyles {
    defaultSelectedStyle: ViewStyle & TextStyle;
}

const useDefaultSelectItemStyles = (): UseDefaultSelectItemStyles => {
    const theme = useTheme();

    const defaultSelectedStyle = {
        backgroundColor: alpha(theme.palette.primary, 0.4),
        fontWeight: "bold",
    };

    return {
        defaultSelectedStyle,
    };
};

export default useDefaultSelectItemStyles;
