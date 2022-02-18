import { Theme } from "@peersyst/react-native-styled";
import { GetVariantStyleProps } from "../Button.types";

export function useButtonStyles(theme: Theme): GetVariantStyleProps {
    const outlined = {
        dark: {
            color: theme.palette.black,
            borderColor: theme.palette.black,
        },
        light: {
            color: theme.palette.white,
            borderColor: theme.palette.white,
        },
        gray: {
            color: theme.palette.darkGray,
            borderColor: theme.palette.darkGray,
        },
    };
    const contained = {
        dark: {
            backgroundColor: theme.palette.black,
            color: theme.palette.white,
            borderColor: theme.palette.black,
        },
        light: {
            backgroundColor: theme.palette.white,
            color: theme.palette.black,
            borderColor: theme.palette.white,
        },
        gray: {
            backgroundColor: theme.palette.darkLightGray,
            color: theme.palette.white,
            borderColor: theme.palette.darkLightGray,
        },
    };
    const pressed = {
        dark: {
            color: theme.palette.white,
            backgroundColor: theme.palette.black,
        },
        light: {
            color: theme.palette.black,
            backgroundColor: theme.palette.white,
        },
        gray: {
            color: theme.palette.white,
            backgroundColor: theme.palette.darkGray,
        },
    };
    const pressedContained = {
        dark: {
            backgroundColor: theme.palette.white,
            color: theme.palette.black,
            borderColor: theme.palette.white,
        },
        light: {
            backgroundColor: theme.palette.black,
            color: theme.palette.white,
            borderColor: theme.palette.black,
        },
        gray: {
            backgroundColor: theme.palette.black,
            color: theme.palette.white,
            borderColor: theme.palette.black,
        },
    };
    return { outlined, pressed, contained, pressedContained };
}
