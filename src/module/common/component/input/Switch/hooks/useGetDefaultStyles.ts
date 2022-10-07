import { FormControlStateStyle } from "@peersyst/react-native-components";
import { useTheme } from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import { SwitchStyle } from "../Switch.types";

export const useGetDefaultStyles = (): FormControlStateStyle<Partial<SwitchStyle>> => {
    const theme = useTheme();
    return {
        disabled: {
            thumb: {
                backgroundColor: lighten(theme.palette.disabled, 0.1),
                inactiveBackgroundColor: lighten(theme.palette.disabled, 0.1),
            },
            track: {
                backgroundColor: lighten(theme.palette.disabled, 0.4),
            },
        },
    };
};
