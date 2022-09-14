import { Button } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { useButtonStyles } from "./hooks/useButtonStyles";
import { ButtonRootProps } from "./Button.types";

export const ButtonRoot = styled(Button)<ButtonRootProps>(({ theme, appearance }) => {
    const { outlined, pressed, filled, pressedFilled } = useButtonStyles(theme);
    return {
        borderRadius: 42,
        fontWeight: "700",
        textTransform: "uppercase",
        lg: {
            borderWidth: 5,
            height: 50,
            fontSize: 16,
            paddingHorizontal: 20,
        },
        sm: {
            borderWidth: 3,
            height: 36,
            fontSize: 14,
            paddingHorizontal: 30,
        },
        outlined: {
            ...outlined[appearance],
        },
        pressed: {
            ...pressed[appearance],
            filled: {
                ...pressedFilled[appearance],
            },
        },
        filled: {
            ...filled[appearance],
        },
        disabled: {
            borderColor: theme.palette.disabled,
        },
    };
});
