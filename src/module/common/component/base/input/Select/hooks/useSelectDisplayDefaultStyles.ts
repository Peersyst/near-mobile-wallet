import { Platform, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "@peersyst/react-native-styled";

interface UseSelectDisplayDefaultStyles {
    defaultStyle: [TextStyle, ViewStyle];
    defaultDisabledStyle: [TextStyle, ViewStyle];
}

const useSelectDisplayDefaultStyles = (): UseSelectDisplayDefaultStyles => {
    const theme = useTheme();

    return {
        defaultStyle: [
            { color: theme.palette.text, marginTop: Platform.OS === "ios" ? 5 : 0 },
            {
                height: 40,
                paddingHorizontal: 15,
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: theme.palette.text,
            },
        ],
        defaultDisabledStyle: [
            { color: theme.palette.disabled },
            {
                borderColor: theme.palette.disabled,
            },
        ],
    };
};

export default useSelectDisplayDefaultStyles;
