import { FormControlContextType } from "@peersyst/react-components-core";
import { FormControlStateStyle } from "@peersyst/react-native-components";
import { SwitchStyle } from "../Switch.types";

export default function (
    {
        track: defaultTrackStyle,
        thumb: defaultThumbStyle,
        invalid: { track: defaultInvalidTrackStyle, thumb: defaultInvalidThumbStyle } = {},
        valid: { track: defaultValidTrackStyle, thumb: defaultValidThumbStyle } = {},
        disabled: { track: defaultDisabledTrackStyle, thumb: defaultDisabledThumbStyle } = {},
        focused: { track: defaultFocusedTrackStyle, thumb: defaultFocusedThumbStyle } = {},
        readonly: { track: defaultReadonlyTrackStyle, thumb: defaultReadonlyThumbStyle } = {},
        required: { track: defaultRequiredTrackStyle, thumb: defaultRequiredThumbStyle } = {},
    }: FormControlStateStyle<Partial<SwitchStyle>>,
    {
        track: globalTrackStyle,
        thumb: globalThumbStyle,
        invalid: { track: globalInvalidTrackStyle, thumb: globalInvalidThumbStyle } = {},
        valid: { track: globalValidTrackStyle, thumb: globalValidThumbStyle } = {},
        disabled: { track: globalDisabledTrackStyle, thumb: globalDisabledThumbStyle } = {},
        focused: { track: globalFocusedTrackStyle, thumb: globalFocusedThumbStyle } = {},
        readonly: { track: globalReadonlyTrackStyle, thumb: globalReadonlyThumbStyle } = {},
        required: { track: globalRequiredTrackStyle, thumb: globalRequiredThumbStyle } = {},
    }: FormControlStateStyle<Partial<SwitchStyle>>,
    {
        track: trackStyle,
        thumb: thumbStyle,
        invalid: { track: invalidTrackStyle, thumb: invalidThumbStyle } = {},
        valid: { track: validTrackStyle, thumb: validThumbStyle } = {},
        disabled: { track: disabledTrackStyle, thumb: disabledThumbStyle } = {},
        focused: { track: focusedTrackStyle, thumb: focusedThumbStyle } = {},
        readonly: { track: readonlyTrackStyle, thumb: readonlyThumbStyle } = {},
        required: { track: requiredTrackStyle, thumb: requiredThumbStyle } = {},
    }: FormControlStateStyle<Partial<SwitchStyle>>,
    { required, invalid, disabled, readonly, focused, valid }: FormControlContextType,
): SwitchStyle {
    const finalTrackStyle = { ...defaultTrackStyle, ...globalTrackStyle, ...trackStyle };
    const invalidFinalTrackStyle = { ...defaultInvalidTrackStyle, ...globalInvalidTrackStyle, ...invalidTrackStyle };
    const validFinalTrackStyle = { ...defaultValidTrackStyle, ...globalValidTrackStyle, ...validTrackStyle };
    const disabledFinalTrackStyle = { ...defaultDisabledTrackStyle, ...globalDisabledTrackStyle, ...disabledTrackStyle };
    const focusedFinalTrackStyle = { ...defaultFocusedTrackStyle, ...globalFocusedTrackStyle, ...focusedTrackStyle };
    const readonlyFinalTrackStyle = { ...defaultReadonlyTrackStyle, ...globalReadonlyTrackStyle, ...readonlyTrackStyle };
    const requiredFinalTrackStyle = { ...defaultRequiredTrackStyle, ...globalRequiredTrackStyle, ...requiredTrackStyle };

    const finalThumbStyle = { ...defaultThumbStyle, ...globalThumbStyle, ...thumbStyle };
    const invalidFinalThumbStyle = { ...defaultInvalidThumbStyle, ...globalInvalidThumbStyle, ...invalidThumbStyle };
    const validFinalThumbStyle = { ...defaultValidThumbStyle, ...globalValidThumbStyle, ...validThumbStyle };
    const disabledFinalThumbStyle = { ...defaultDisabledThumbStyle, ...globalDisabledThumbStyle, ...disabledThumbStyle };
    const focusedFinalThumbStyle = { ...defaultFocusedThumbStyle, ...globalFocusedThumbStyle, ...focusedThumbStyle };
    const readonlyFinalThumbStyle = { ...defaultReadonlyThumbStyle, ...globalReadonlyThumbStyle, ...readonlyThumbStyle };
    const requiredFinalThumbStyle = { ...defaultRequiredThumbStyle, ...globalRequiredThumbStyle, ...requiredThumbStyle };

    return {
        thumb: {
            ...finalThumbStyle,
            ...(required && requiredFinalThumbStyle),
            ...(focused && focusedFinalThumbStyle),
            ...(readonly && readonlyFinalThumbStyle),
            ...(invalid && invalidFinalThumbStyle),
            ...(valid && validFinalThumbStyle),
            ...(disabled && disabledFinalThumbStyle),
        },
        track: {
            ...finalTrackStyle,
            ...(required && requiredFinalTrackStyle),
            ...(focused && focusedFinalTrackStyle),
            ...(readonly && readonlyFinalTrackStyle),
            ...(invalid && invalidFinalTrackStyle),
            ...(valid && validFinalTrackStyle),
            ...(disabled && disabledFinalTrackStyle),
        },
    };
}
