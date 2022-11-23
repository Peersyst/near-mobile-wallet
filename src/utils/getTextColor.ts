import { Theme } from "@peersyst/react-native-styled";
import { PaletteMode } from "@peersyst/react-native-components";

export function getTextColor(theme: Theme, appearance?: PaletteMode): string {
    if (appearance) return appearance === "dark" ? theme.palette.black : theme.palette.white;
    else return theme.palette.text;
}
