import { useState } from "react";
import { Pressable } from "react-native";
import { TouchableText } from "./PressableText.styles";
import { PressableTextProps } from "./PressableText.types";

const PressableText = ({ children, onPress, ...res }: PressableTextProps): JSX.Element => {
    const [pressed, setPressed] = useState<boolean>(false);
    return (
        <Pressable onPress={onPress} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
            <TouchableText {...res} pressed={pressed}>
                {children}
            </TouchableText>
        </Pressable>
    );
};

export default PressableText;
