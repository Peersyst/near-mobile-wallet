import { InputStyle, TextInputStyles } from "../TextInput.types";
import useDefaultStyles from "./useDefaultStyles";
import { TextStyle, ViewStyle } from "react-native";

export interface UseTextInputStylesResult {
    inputStyle: InputStyle;
    rootStyle: ViewStyle;
    errorStyle: TextStyle;
    hintStyle: TextStyle;
}

export default function useTextInputStyles(
    {
        invalid: { input: invalidInputStyles, ...invalidStyles } = {},
        valid: { input: validInputStyles, ...validStyles } = {},
        disabled: { input: disabledInputStyles, ...disabledStyles } = {},
        focused: { input: focusedInputStyles, ...focusedStyles } = {},
        error: errorStyles,
        hint: hintStyles,
        input: inputStyles,
        ...styles
    }: TextInputStyles,
    invalid: boolean,
    showValid: boolean,
    disabled: boolean,
    focused: boolean,
): UseTextInputStylesResult {
    const {
        defaultStyle: { input: defaultInputStyle, ...defaultStyle },
        defaultInvalidStyle: { input: defaultInvalidInputStyle, ...defaultInvalidStyle },
        defaultValidStyle: { input: defaultValidInputStyle, ...defaultValidStyle },
        defaultDisabledStyle: { input: defaultDisabledInputStyle, ...defaultDisabledStyle },
        defaultFocusedStyle: { input: defaultFocusedInputStyle, ...defaultFocusedStyle },
        defaultErrorStyle,
        defaultHintStyle,
    } = useDefaultStyles();

    const style = { ...defaultStyle, ...styles };
    const invalidStyle = { ...defaultInvalidStyle, ...invalidStyles };
    const validStyle = { ...defaultValidStyle, ...validStyles };
    const disabledStyle = { ...defaultDisabledStyle, ...disabledStyles };
    const focusedStyle = { ...defaultFocusedStyle, ...focusedStyles };

    const inputStyle = { ...defaultInputStyle, ...inputStyles };
    const invalidInputStyle = { ...defaultInvalidInputStyle, ...invalidInputStyles };
    const validInputStyle = { ...defaultValidInputStyle, ...validInputStyles };
    const disabledInputStyle = { ...defaultDisabledInputStyle, ...disabledInputStyles };
    const focusedInputStyle = { ...defaultFocusedInputStyle, ...focusedInputStyles };

    const errorStyle = { ...defaultErrorStyle, ...errorStyles };
    const hintStyle = { ...defaultHintStyle, ...hintStyles };

    return {
        inputStyle: {
            ...inputStyle,
            ...(focused && focusedInputStyle),
            ...(disabled && disabledInputStyle),
            ...(invalid && invalidInputStyle),
            ...(showValid && validInputStyle),
        },
        rootStyle: {
            ...style,
            ...(focused && focusedStyle),
            ...(disabled && disabledStyle),
            ...(invalid && invalidStyle),
            ...(showValid && validStyle),
        },
        errorStyle,
        hintStyle,
    };
}
