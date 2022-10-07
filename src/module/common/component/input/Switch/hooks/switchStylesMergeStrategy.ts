import { FormControlStateStyle } from "@peersyst/react-native-components";
import { SwitchStyle } from "../Switch.types";

export function switchStylesMergeStrategy(
    {
        track: defaultTrackStyle,
        thumb: defaultThumbStyle,
        disabled: { thumb: defaultThumbDisabledStyle, track: defaultTrackDisabledStyle } = {},
    }: FormControlStateStyle<SwitchStyle>,
    {
        track: thumbStyle,
        thumb: trackStyle,
        disabled: { thumb: thumbDisabledStyle, track: trackDisabledStyle } = {},
    }: FormControlStateStyle<SwitchStyle>,
    disabled: boolean,
): FormControlStateStyle<SwitchStyle> {
    return {
        track: {
            ...defaultTrackStyle,
            ...trackStyle,
            ...(disabled && {
                ...defaultTrackDisabledStyle,
                ...trackDisabledStyle,
            }),
        },
        thumb: {
            ...defaultThumbStyle,
            ...thumbStyle,
            ...(disabled && {
                ...defaultThumbDisabledStyle,
                ...thumbDisabledStyle,
            }),
        },
    };
}
