import { TextInputProps } from "./TextInput.types";
import { Input, InvalidIcon, TextInputRoot, ValidIcon } from "./TextInput.styles";
import { NativeSyntheticEvent, TextInputFocusEventData, Text, TextStyle } from "react-native";
import { useControlled } from "@peersyst/react-hooks";
import { useEffect, useState } from "react";
import { useTextInputValidation } from "./hooks/useTextInputValidation";
import { useFormNotification } from "../Form";
import { useTheme } from "@peersyst/react-native-styled";
import useTextInputStyles from "./hooks/useTextInputStyles";
import { Col } from "../../layout/Col";
import { Icon } from "../../display/Icon";
import { IconButton } from "../IconButton";

const TextInput = ({
    defaultValue = "",
    value: valueProp,
    onChange,
    name,
    validators,
    customValidators,
    onInvalid,
    disabled = false,
    readonly = false,
    hint,
    prefix,
    suffix,
    errorElement: errorElementProp,
    showValid: showValidProp = false,
    validElement: validElementProp,
    showTextElement: showTextElementProp,
    hideTextElement: hideTextElementProp,
    clearable = false,
    clearElement: clearElementProp,
    style = {},
    onFocus,
    onBlur,
    secureTextEntry = false,
    input,
    ...rest
}: TextInputProps): JSX.Element => {
    const [value, setValue] = useControlled(defaultValue, valueProp, onChange);
    const [modified, setModified] = useState(false);
    const [showText, setShowText] = useState(secureTextEntry);

    const editable = !disabled && !readonly;

    const [focused, setFocused] = useState<boolean>(false);
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (editable) {
            setFocused(true);
            onFocus?.(e);
        }
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (editable) {
            setFocused(false);
            onBlur?.(e);
        }
    };

    const { valid, errors } = useTextInputValidation(value, validators, customValidators, onInvalid);
    useFormNotification(name, value, valid);

    useEffect(() => {
        !modified && value !== "" && setModified(true);
    }, [modified, value]);

    const invalid = modified && !valid;
    const showValid = modified && valid && showValidProp;

    const {
        inputStyle: { placeholderColor = undefined, highlightColor = undefined, ...inputStyles } = {},
        errorStyle,
        hintStyle,
        rootStyle,
    } = useTextInputStyles(style, invalid, showValid, disabled, focused);
    const iconStyle: TextStyle = { ...inputStyles, lineHeight: undefined, height: undefined, fontSize: (inputStyles.fontSize || 0) + 4 };

    const {
        icons: { invalid: Invalid, valid: Valid, show: Show, hide: Hide, cross: Cross },
    } = useTheme();
    const errorElement = errorElementProp || <Invalid />;
    const validElement = validElementProp || <Valid />;
    const showTextElement = showTextElementProp || <Show />;
    const hideTextElement = hideTextElementProp || <Hide />;
    const clearElement = clearElementProp || <Cross />;

    return (
        <Col gap={5} style={{ width: "100%" }}>
            <TextInputRoot style={rootStyle}>
                {prefix && <Icon style={iconStyle}>{prefix}</Icon>}
                <Input
                    placeholderTextColor={placeholderColor}
                    selectionColor={highlightColor}
                    style={inputStyles}
                    value={value}
                    onChangeText={setValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={editable}
                    secureTextEntry={showText}
                    as={input}
                    {...rest}
                />
                {clearable && !!value && editable && (
                    <IconButton style={iconStyle} onPress={() => setValue("")}>
                        {clearElement}
                    </IconButton>
                )}
                {secureTextEntry && (
                    <IconButton style={iconStyle} onPress={() => setShowText(!showText)}>
                        {showText ? showTextElement : hideTextElement}
                    </IconButton>
                )}
                {invalid ? (
                    <InvalidIcon style={{ fontSize: iconStyle.fontSize }}>{errorElement}</InvalidIcon>
                ) : (
                    showValid && <ValidIcon style={{ fontSize: iconStyle.fontSize }}>{validElement}</ValidIcon>
                )}
                {suffix && <Icon style={iconStyle}>{suffix}</Icon>}
            </TextInputRoot>
            {invalid && <Text style={errorStyle}>{errors.join(", ")}</Text>}
            {hint && <Text style={hintStyle}>{hint}</Text>}
        </Col>
    );
};

export default TextInput;
