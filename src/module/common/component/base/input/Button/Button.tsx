import { ButtonRoot, ButtonLoader, ButtonContent } from "./Button.styles";
import { ButtonProps } from "./Button.types";
import { TouchableWithoutFeedback, ActivityIndicator, Text } from "react-native";
import { useContext, useMemo, useState } from "react";
import { useStyled } from "@peersyst/react-native-styled";
import { Icon } from "../../display/Icon";
import useButtonStyles from "./hooks/useButtonStyles";
import { deepmerge } from "@peersyst/react-utils";
import { FormContext } from "../Form";

const Button = ({
    onPress: onPressProp,
    children,
    loading = false,
    loadingElement,
    size = "md",
    rightIcon,
    leftIcon,
    fullWidth = false,
    disabled: disabledProp = false,
    variant = "contained",
    style,
    sx: sxProp,
    ...rest
}: ButtonProps): JSX.Element => {
    const [pressed, setPressed] = useState(false);

    const { handleSubmit, valid } = useContext(FormContext);
    const onPress = onPressProp || handleSubmit;
    const disabled = disabledProp || valid === false;

    const sx = useStyled(sxProp, { variant, size, disabled, pressed });
    const styles = useMemo(() => deepmerge(style, sx()), [style, sx]);
    const { textStyle, rootStyle } = useButtonStyles(styles || {}, variant, size, disabled, pressed);

    const pressable = !disabled && !loading;

    return (
        <TouchableWithoutFeedback
            onPress={(e) => pressable && onPress?.(e)}
            accessibilityRole="button"
            onPressIn={() => pressable && setPressed(true)}
            onPressOut={() => pressable && setPressed(false)}
            {...rest}
        >
            <ButtonRoot style={rootStyle} fullWidth={fullWidth}>
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
