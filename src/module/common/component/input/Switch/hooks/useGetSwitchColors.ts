import { useTheme } from "@peersyst/react-native-styled";

export interface SwichColor {
    trackBgColor: string;
    inactiveTrackBgColor: string;
    thumbBgColor: string;
}

export type UseGetSwitchColors = (style: Partial<SwichColor>) => SwichColor;

export default function useGetSwitchColors(): UseGetSwitchColors {
    const theme = useTheme();
    const getSwitchColors = ({
        thumbBgColor,
        inactiveTrackBgColor,
        trackBgColor,
    }: Partial<SwichColor>) => {
        return {
            trackBgColor: trackBgColor ?? theme.palette.primary,
            inactiveTrackBgColor: inactiveTrackBgColor ?? theme.palette.disabled,
            thumbBgColor: thumbBgColor ?? theme.palette.background,
        };
    };
    return getSwitchColors;
}
