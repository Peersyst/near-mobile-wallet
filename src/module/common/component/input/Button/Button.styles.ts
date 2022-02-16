import { Button } from "react-native-components";
import { ButtonRootProps, GetVariantStyleProps } from "./Button.types";
import styled from "@peersyst/react-native-styled";
import { Theme } from "@peersyst/react-native-styled";

function getVariantStyle(theme: Theme): GetVariantStyleProps {
    const outlined = {
        dark: {
            color: theme.palette.black,
            borderColor: theme.palette.black,
            borderWidth: 5
        },
        light: {
            color: theme.palette.white,
            borderColor: theme.palette.white,
            borderWidth: 3
        }
    }
    const pressed = {
        dark: {
            color: theme.palette.white,
            backgroundColor: theme.palette.black
        },
        light: {
            color: theme.palette.black,
            backgroundColor: theme.palette.white
        }
    }
    return { outlined, pressed }

}

export const ButtonRoot = styled(Button, { variant: "outlined" })<ButtonRootProps>(

    ({ theme, appearence }) => {

        const { outlined, pressed } = getVariantStyle(theme)

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
