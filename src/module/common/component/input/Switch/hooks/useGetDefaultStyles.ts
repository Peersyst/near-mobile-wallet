import { FormControlStateStyle } from "@peersyst/react-native-components";
import { useTheme } from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import { SwitchStyle } from "../Switch.types";

export const useGetDefaultStyles = (): FormControlStateStyle<Partial<SwitchStyle>> => {
    const theme = useTheme();
    return {
        disabled: {
            backgroundColor: lighten(theme.palette.disabled, 0.01),
            active: {
                backgroundColor: lighten(theme.palette.disabled, 0.1),
            },
            thumb: {
                backgroundColor: lighten(theme.palette.disabled, 0.4),
            },
        },
    };
};
