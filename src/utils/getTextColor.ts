import { Theme } from "@peersyst/react-native-styled";
import { Appearance } from "module/common/types";

export function getTextColor(theme: Theme, appearance?: Appearance): string {
    if (appearance) return appearance === "dark" ? theme.palette.black : theme.palette.white;
    else return theme.palette.text;
}
