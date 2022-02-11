import { ButtonRoot, ButtonLoader, ButtonContent, ButtonText } from "./Button.styles";
import { ButtonProps } from "./Button.types";
import { TouchableWithoutFeedback, StyleSheet, TextStyle, ActivityIndicator } from "react-native";
import { useState } from "react";
import { extractTextStyles } from "utils/extractTextStyles";
import { useStyled, useTheme } from "@peersyst/react-native-styled";
import ButtonIcon from "module/common/component/base/input/Button/ButtonIcon";

const Button = ({
    onPress,
    children,
    loading = false,
    loadingElement,
    size = "md",
    rightIcon,
    leftIcon,
    fullWidth = false,
    disabled = false,
    variant = "contained",
    style,
    sx: sxProp,
}: ButtonProps): JSX.Element => {
    const [pressed, setPressed] = useState(false);
    const sx = useStyled(sxProp, { variant, size, disabled, pressed });

    const theme = useTheme();
    const styles = StyleSheet.flatten([style, sx()]);
    const [textStyles, rootStyles] = extractTextStyles(styles as TextStyle);

    const pressable = !disabled && !loading;

    return (
        <TouchableWithoutFeedback
            onPress={(e) => pressable && onPress?.(e)}
            accessibilityRole="button"
            onPressIn={() => pressable && setPressed(true)}
            onPressOut={() => pressable && setPressed(false)}
        >
            <ButtonRoot variant={variant} size={size} fullWidth={fullWidth} style={rootStyles} pressed={pressed} disabled={disabled}>
                {loading && (
                    <ButtonLoader>
                        {loadingElement ? (
                            loadingElement
                        ) : (
                            <ActivityIndicator
                                color={
                                    disabled
                                        ? theme.palette.disabled
                                        : textStyles.color || (variant === "contained" ? theme.palette.text : theme.palette.primary)
                                }
                            />
                        )}
                    </ButtonLoader>
                )}
                <ButtonContent isLoading={loading}>
                    {leftIcon && (
                        <ButtonIcon variant={variant} size={size} disabled={disabled}>
                            {leftIcon}
                        </ButtonIcon>
                    )}
                    <ButtonText style={{ ...textStyles }} size={size} variant={variant} disabled={disabled}>
                        {children}
                    </ButtonText>
                    {rightIcon && (
                        <ButtonIcon variant={variant} size={size} disabled={disabled}>
                            {rightIcon}
                        </ButtonIcon>
                    )}
                </ButtonContent>
            </ButtonRoot>
        </TouchableWithoutFeedback>
    );
};

export default Button;
