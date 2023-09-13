import { PaletteMode, useTheme } from "@peersyst/react-native-components";

export default function useThemeMode(): PaletteMode {
    const { palette } = useTheme();

    return palette.mode;
}
