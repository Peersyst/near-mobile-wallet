import { FormControlContextType } from "@peersyst/react-components-core";
import { FormControlStateStyle } from "@peersyst/react-native-components";
import { SwitchBaseStyle, SwitchCoreStyle } from "../Switch.types";

export default function (
    active: boolean,
    {
        invalid: { active: defaultInvalidActiveStyle, ...defaultInvalidInactiveStyle } = {},
        valid: { active: defaultValidActiveStyle, ...defaultValidInactiveStyle } = {},
        disabled: { active: defaultDisabledActiveStyle, ...defaultDisabledInactiveStyle } = {},
        focused: { active: defaultFocusedActiveStyle, ...defaultFocusedInactiveStyle } = {},
        readonly: { active: defaultReadonlyActiveStyle, ...defaultReadonlyInactiveStyle } = {},
        required: { active: defaultRequiredActiveStyle, ...defaultRequiredInactiveStyle } = {},
        active: defaultActiveStyle,
        ...defaultInactiveStyle
    }: FormControlStateStyle<SwitchCoreStyle>,
    {
        active: globalActiveStyle,
        invalid: { active: globalInvalidActiveStyle, ...globalInvalidInactiveStyle } = {},
        valid: { active: globalValidActiveStyle, ...globalValidInactiveStyle } = {},
        disabled: { active: globalDisabledActiveStyle, ...globalDisabledInactiveStyle } = {},
        focused: { active: globalFocusedActiveStyle, ...globalFocusedInactiveStyle } = {},
        readonly: { active: globalReadonlyActiveStyle, ...globalReadonlyInactiveStyle } = {},
        required: { active: globalRequiredActiveStyle, ...globalRequiredInactiveStyle } = {},
        ...globalInactiveStyle
    }: FormControlStateStyle<Partial<SwitchCoreStyle>>,
    {
        invalid: { active: styleInvalidActiveStyle, ...styleInvalidInactiveStyle } = {},
        valid: { active: styleValidActiveStyle, ...styleValidInactiveStyle } = {},
        disabled: { active: styleDisabledActiveStyle, ...styleDisabledInactiveStyle } = {},
        focused: { active: styleFocusedActiveStyle, ...styleFocusedInactiveStyle } = {},
        readonly: { active: styleReadonlyActiveStyle, ...styleReadonlyInactiveStyle } = {},
        required: { active: styleRequiredActiveStyle, ...styleRequiredInactiveStyle } = {},
        active: styleActiveStyle,
        ...styleInactiveStyle
    }: FormControlStateStyle<Partial<SwitchCoreStyle>>,
    { readonly, required, focused, invalid, valid, disabled }: FormControlContextType,
): SwitchBaseStyle {
    const finalActive = {
        ...defaultActiveStyle,
        ...globalActiveStyle,
        ...styleActiveStyle,
        ...(required && {
            ...defaultRequiredActiveStyle,
            ...globalRequiredActiveStyle,
            ...styleRequiredActiveStyle,
        }),
        ...(focused && {
            ...defaultFocusedActiveStyle,
            ...globalFocusedActiveStyle,
            ...styleFocusedActiveStyle,
        }),
        ...(readonly && {
            ...defaultReadonlyActiveStyle,
            ...globalReadonlyActiveStyle,
            ...styleReadonlyActiveStyle,
        }),
        ...(invalid && {
            ...defaultInvalidActiveStyle,
            ...globalInvalidActiveStyle,
            ...styleInvalidActiveStyle,
        }),
        ...(valid && {
            ...defaultValidActiveStyle,
            ...globalValidActiveStyle,
            ...styleValidActiveStyle,
        }),
        ...(disabled && {
            ...defaultDisabledActiveStyle,
            ...globalDisabledActiveStyle,
            ...styleDisabledActiveStyle,
        }),
    };
    const finalInactive = {
        ...defaultInactiveStyle,
        ...globalInactiveStyle,
        ...styleInactiveStyle,
        ...(required && {
            ...defaultRequiredInactiveStyle,
            ...globalRequiredInactiveStyle,
            ...styleRequiredInactiveStyle,
        }),
        ...(focused && {
            ...defaultFocusedInactiveStyle,
            ...globalFocusedInactiveStyle,
            ...styleFocusedInactiveStyle,
        }),
        ...(readonly && {
            ...defaultReadonlyInactiveStyle,
            ...globalReadonlyInactiveStyle,
            ...styleReadonlyInactiveStyle,
        }),
        ...(invalid && {
            ...defaultInvalidInactiveStyle,
            ...globalInvalidInactiveStyle,
            ...styleInvalidInactiveStyle,
        }),
        ...(valid && {
            ...defaultValidInactiveStyle,
            ...globalValidInactiveStyle,
            ...styleValidInactiveStyle,
        }),
        ...(disabled && {
            ...defaultDisabledInactiveStyle,
            ...globalDisabledInactiveStyle,
            ...styleDisabledInactiveStyle,
        }),
    };
    return {
        ...finalInactive,
        ...(active && {
            ...finalActive,
        }),
    };
}
