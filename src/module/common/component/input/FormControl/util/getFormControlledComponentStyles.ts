import { FormControlContextType } from "@peersyst/react-components-core";
import { FormControlStateStyle } from "@peersyst/react-native-components";

export default function <S>(
    {
        required: requiredDefaultStyle,
        invalid: invalidDefaultStyle,
        disabled: disabledDefaultStyle,
        readonly: readonlyDefaultStyle,
        focused: focusedDefaultStyle,
        valid: validDefaultStyle,
        ...restDefaultStyle
    }: FormControlStateStyle<Partial<S>> = {},
    {
        required: requiredGlobalStyle,
        invalid: invalidGlobalStyle,
        disabled: disabledGlobalStyle,
        readonly: readonlyGlobalStyle,
        focused: focusedGlobalStyle,
        valid: validGlobalStyle,
        ...defaultGlobalStyle
    }: FormControlStateStyle<Partial<S>>,
    {
        required: requiredStyle,
        invalid: invalidStyle,
        disabled: disabledStyle,
        readonly: readonlyStyle,
        focused: focusedStyle,
        valid: validStyle,
        ...defaultStyle
    }: FormControlStateStyle<Partial<S>>,
    { required, invalid, disabled, readonly, focused, valid }: FormControlContextType,
): S {
    const defaultStyles = { ...restDefaultStyle, ...defaultGlobalStyle, ...defaultStyle };
    const requiredStyles = required ? { ...requiredDefaultStyle, ...requiredGlobalStyle, ...requiredStyle } : {};
    const invalidStyles = invalid ? { ...invalidDefaultStyle, ...invalidGlobalStyle, ...invalidStyle } : {};
    const disabledStyles = disabled ? { ...disabledDefaultStyle, ...disabledGlobalStyle, ...disabledStyle } : {};
    const readonlyStyles = readonly ? { ...readonlyDefaultStyle, ...readonlyGlobalStyle, ...readonlyStyle } : {};
    const focusedStyles = focused ? { ...focusedDefaultStyle, ...focusedGlobalStyle, ...focusedStyle } : {};
    const validStyles = valid ? { ...validDefaultStyle, ...validGlobalStyle, ...validStyle } : {};

    return {
        ...defaultStyles,
        ...requiredStyles,
        ...focusedStyles,
        ...readonlyStyles,
        ...invalidStyles,
        ...validStyles,
        ...disabledStyles,
    } as S;
}
