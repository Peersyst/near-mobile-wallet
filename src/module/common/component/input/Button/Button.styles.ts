import { Button } from "react-native-components";
import styled from "@peersyst/react-native-styled";
import { useButtonStyles } from "./hooks/useButtonStyles";
import { AppearanceProps } from "module/common/types";

export const ButtonRoot = styled(Button, { variant: "outlined" })<AppearanceProps>(({ theme, appearance }) => {
    const { outlined, pressed } = useButtonStyles(theme);
    return {
        borderRadius: 42,
        textTransform: "uppercase",
        fontWeight: "bold",
        lg: {
            height: 70,
            fontSize: 22,
            paddingHorizontal: 26,
        },
        outlined: {
            ...outlined[appearance],
        },
        pressed: {
            ...pressed[appearance],
        },
    };
});
