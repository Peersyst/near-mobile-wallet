import { Theme } from "@peersyst/react-native-styled"
import { GetVariantStyleProps } from "../Button.types"

export function useButtonStyles(theme: Theme): GetVariantStyleProps {
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