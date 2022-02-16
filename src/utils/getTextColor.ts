import { Theme } from "@peersyst/react-native-styled";
import { Appearance } from "module/common/types";
import { TextStyle } from "react-native";

export function getTextColor(theme: Theme): Record<Appearance, Pick<TextStyle, "color">> {
    return {
        dark: {
            color: theme.palette.black,
        },
        light: {
            color: theme.palette.white,
        },
    };
}
