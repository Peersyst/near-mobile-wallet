import { useState } from "react";
import { Pressable } from "react-native";
import { TouchableText } from "./PressableText.styles";
import { PressableTextProps } from "./PressableText.types";

const PressableText = ({ children, onPress, disabled = false, ...res }: PressableTextProps): JSX.Element => {
    const [pressed, setPressed] = useState<boolean>(false);
    return (
        <Pressable
            onPress={disabled ? undefined : onPress}
            onPressIn={() => !disabled && setPressed(true)}
            onPressOut={() => setPressed(false)}
            accessibilityRole="button"
        >
            <TouchableText {...res} pressed={pressed} disabled={disabled}>
                {children}
            </TouchableText>
        </Pressable>
    );
};

export default PressableText;
