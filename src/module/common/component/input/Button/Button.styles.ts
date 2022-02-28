import { Button } from "react-native-components";
import styled from "@peersyst/react-native-styled";
import { useButtonStyles } from "./hooks/useButtonStyles";
import { ButtonAppearanceProps } from "./Button.types";

export const ButtonRoot = styled(Button)<ButtonAppearanceProps>(({ theme, appearance }) => {
    const { outlined, pressed, contained, pressedContained } = useButtonStyles(theme);
    return {
        borderRadius: 42,
        fontWeight: "bold",
        lg: {
            borderWidth: 3,
            height: 58,
            fontSize: 20,
            paddingHorizontal: 20,
        },
        sm: {
            borderWidth: 2,
            height: 36,
            fontSize: 14,
            paddingHorizontal: 30,
        },
        outlined: {
            ...outlined[appearance],
        },
        pressed: {
            ...pressed[appearance],
            contained: {
                ...pressedContained[appearance],
            },
        },
        contained: {
            ...contained[appearance],
        },
    };
});
