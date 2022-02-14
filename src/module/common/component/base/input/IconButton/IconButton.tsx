import { IconButtonProps } from "./IconButton.types";
import { useStyled } from "@peersyst/react-native-styled";
import { useState } from "react";
import { IconButtonRoot } from "./IconButton.styles";
import { Icon } from "../../display/Icon";
import useIconButtonStyles from "./hook/useIconButtonStyles";
import { TouchableWithoutFeedback } from "react-native";

const IconButton = ({ onPress, disabled = false, style: styleProp, sx: sxProp, children }: IconButtonProps): JSX.Element => {
    const [pressed, setPressed] = useState(false);

    const sx = useStyled(sxProp, { disabled, pressed });
    const style = { ...styleProp, ...sx() };
    const { textStyle, rootStyle } = useIconButtonStyles(style, pressed, disabled);

    return (
        <TouchableWithoutFeedback
            onPress={(e) => !disabled && onPress?.(e)}
            accessibilityRole="button"
            onPressIn={() => !disabled && setPressed(true)}
            onPressOut={() => !disabled && setPressed(false)}
        >
            <IconButtonRoot style={rootStyle}>
                <Icon style={textStyle}>{children}</Icon>
            </IconButtonRoot>
        </TouchableWithoutFeedback>
    );
};

export default IconButton;
