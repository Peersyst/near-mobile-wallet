import { Button } from "react-native-components";
import { ButtonRootProps } from "./Button.types";
import styled from "@peersyst/react-native-styled";
import { useButtonStyles } from "./hooks/useButtonStyles";

export const ButtonRoot = styled(Button, { variant: "outlined" })<ButtonRootProps>(

    ({ theme, appearence }) => {

        const { outlined, pressed } = useButtonStyles(theme)

        return {
            borderRadius: 42,
            textTransform: "uppercase",
            fontWeight: "bold",
            lg: {
                height: 70,
                fontSize: 22,
                paddingHorizontal: 26
            },
            outlined: {
                ...outlined[appearence]
            },
            pressed: {
                ...pressed[appearence]
            }
        }
    },
);
