import { useTheme } from "@peersyst/react-native-styled";

export interface SwichColor {
    thumbBgColor: string;
    inactiveThumbBgColor: string;
    trackBgColor: string;
}

export type UseGetSwitchColors = (style: Partial<SwichColor>) => SwichColor;

export default function useGetSwitchColors(): UseGetSwitchColors {
    const theme = useTheme();
    const getSwitchColors = ({
        thumbBgColor,
        inactiveThumbBgColor,
        trackBgColor,
    }: Partial<SwichColor>) => {
        return {
            thumbBgColor: thumbBgColor ?? theme.palette.primary,
            inactiveThumbBgColor: inactiveThumbBgColor ?? theme.palette.disabled,
            trackBgColor: trackBgColor ?? theme.palette.background,
        };
    };
    return getSwitchColors;
}
