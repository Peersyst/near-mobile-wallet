import { IconButtonProps } from "./IconButton.types";
import { useState } from "react";
import { IconButtonRoot } from "./IconButton.styles";
import { Icon } from "../../display/Icon";
import useIconButtonStyles from "./hook/useIconButtonStyles";
import { TouchableWithoutFeedback } from "react-native";
import RippleAnimCircle from "module/common/component/util/RippleAnimCircle/RippleAnimCircle";

const IconButton = ({
    onPress,
    disabled = false,
    style = {},
    children,
    onPressIn,
    onPressOut,
    withAnimation,
    ...rest
}: IconButtonProps): JSX.Element => {
    const [pressed, setPressed] = useState(false);

    const { textStyle, rootStyle } = useIconButtonStyles(style, pressed, disabled);

    return (
        <TouchableWithoutFeedback
            onPress={(e) => !disabled && onPress?.(e)}
            accessibilityRole="button"
            onPressIn={() => !disabled && setPressed(true)}
            onPressOut={() => !disabled && setPressed(false)}
        >
            <IconButtonRoot style={rootStyle}>
                {withAnimation && (
                    <RippleAnimCircle
                        {...rest}
                        onPressIn={(e) => !disabled && onPressIn?.(e)}
                        onPressOut={(e) => !disabled && onPressOut?.(e)}
                        onPress={(e) => !disabled && onPress?.(e)}
                    />
                )}
                <Icon style={textStyle}>{children}</Icon>
            </IconButtonRoot>
        </TouchableWithoutFeedback>
    );
};

export default IconButton;
