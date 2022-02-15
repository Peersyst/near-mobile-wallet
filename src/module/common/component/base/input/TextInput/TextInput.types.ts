import { ReactElement } from "react";
import { ColorValue, TextInputProps as NativeTextInputProps, TextStyle, ViewStyle } from "react-native";
import { BaseValidator } from "./utils";
import { SX } from "@peersyst/react-native-styled";

export interface FunctionalValidator {
    validate: (value: string) => boolean;
    message: string;
}

export interface InputStyle extends TextStyle {
    placeholderColor?: ColorValue;
    highlightColor?: ColorValue;
}
export type TextInputStyle = ViewStyle & {
    input?: InputStyle;
};
export type TextInputStyles = TextInputStyle & {
    invalid?: TextInputStyle;
    valid?: TextInputStyle;
    focused?: TextInputStyle;
    disabled?: TextInputStyle;
    readonly?: TextInputStyle;
    error?: TextStyle;
    hint?: TextStyle;
};

export interface TextInputSxProps {
    invalid?: boolean;
    showValid?: boolean;
    focused?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}

export interface InputProps {
    multiline?: boolean;
    numberOfLines?: number;
}

export interface TextInputProps
    extends Omit<
        NativeTextInputProps,
        "placeholderTextColor" | "selectionColor" | "style" | "textAlign" | "editable" | "onChange" | "clearButtonMode"
    > {
    /**
     * Name of the Input
     */
    name?: string;
    /**
     * onChange handler
     */
    onChange?: (value: string) => unknown;
    /**
     * Input's validators
     */
    validators?: string;
    /**
     * Custom validator
     */
    customValidators?: (BaseValidator | FunctionalValidator)[];
    /**
     * onInvalid handler
     * @param message
     */
    onInvalid?: (message: string[]) => void;
    /**
     * Input is disabled
     */
    disabled?: boolean;
    /**
     * Input is readonly
     */
    readonly?: boolean;
    /**
     * TextInput hint
     */
    hint?: string;
    /**
     * Input's prefix
     */
    prefix?: ReactElement;
    /**
     * Input's suffix
     */
    suffix?: ReactElement;
    /**
     * Element shown when input is invalid
     */
    errorElement?: ReactElement;
    /**
     * Show when input is valid
     */
    showValid?: boolean;
    /**
     * Element shown when showValid is true and input is valid
     */
    validElement?: ReactElement;
    /**
     * Show text element
     */
    showTextElement?: ReactElement;
    /**
     * Hide text element
     */
    hideTextElement?: ReactElement;
    /**
     * If input is clearable
     */
    clearable?: boolean;
    /**
     * Clear input element
     */
    clearElement?: ReactElement;
    /**
     * TextInput style
     */
    style?: TextInputStyles;
    /**
     * TextInput sx
     */
    sx?: SX<TextInputSxProps, TextInputStyles>;
}

export type TextFieldProps = Omit<TextInputProps, "multiline" | "numberOfLines">;
export type TextAreaProps = Omit<
    TextInputProps,
    "clearable" | "clearElement" | "secureTextEntry" | "showTextElement" | "hideTextElement" | "multiline"
>;
