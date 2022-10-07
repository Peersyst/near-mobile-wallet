import { useTheme } from "@peersyst/react-native-styled";

export interface SwichColor {
    thumbBgColor: string;
    inactiveThumbBgColor: string;
    trackBgColor: string;
}

export default function useGetSwitchColors({ thumbBgColor, inactiveThumbBgColor, trackBgColor }: Partial<SwichColor>): SwichColor {
    const theme = useTheme();
    return {
        thumbBgColor: thumbBgColor || theme.palette.primary,
        inactiveThumbBgColor: inactiveThumbBgColor || theme.palette.disabled,
        trackBgColor: trackBgColor || theme.palette.background,
    };
}
