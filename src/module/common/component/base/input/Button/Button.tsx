import { ButtonRoot, ButtonLoader, ButtonContent } from "./Button.styles";
import { ButtonProps } from "./Button.types";
import { TouchableWithoutFeedback, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useState } from "react";
import { useStyled } from "@peersyst/react-native-styled";
import { Icon } from "module/common/component/base";
import useButtonStyles from "module/common/component/base/input/Button/hooks/useButtonStyles";

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
    const styles = StyleSheet.flatten([style, sx()]);
    const { textStyle, rootStyle } = useButtonStyles(styles, variant, size, disabled, pressed);

    const pressable = !disabled && !loading;

    return (
        <TouchableWithoutFeedback
            onPress={(e) => pressable && onPress?.(e)}
            accessibilityRole="button"
            onPressIn={() => pressable && setPressed(true)}
            onPressOut={() => pressable && setPressed(false)}
        >
            <ButtonRoot style={rootStyle} variant={variant} size={size} fullWidth={fullWidth} pressed={pressed} disabled={disabled}>
                {loading && (
                    <ButtonLoader>
                        {loadingElement ? <Icon style={textStyle}>{loadingElement}</Icon> : <ActivityIndicator color={textStyle.color} />}
                    </ButtonLoader>
                )}
                <ButtonContent isLoading={loading}>
                    {leftIcon && <Icon style={textStyle}>{leftIcon}</Icon>}
                    <Text style={textStyle}>{children}</Text>
                    {rightIcon && <Icon style={textStyle}>{rightIcon}</Icon>}
                </ButtonContent>
            </ButtonRoot>
        </TouchableWithoutFeedback>
    );
};

export default Button;
