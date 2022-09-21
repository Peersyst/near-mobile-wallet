import { Button } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { ButtonProps } from "./Button.types";
import { emphasize } from "@peersyst/react-utils";

export const ButtonRoot = styled(Button)<ButtonProps>(({ theme, rounded = true }) => {
    return {
        borderRadius: rounded ? 10000 : undefined,
        //Size Styles
        lg: {
            ...theme.typography.body2Strong,
            height: 52,
            paddingHorizontal: 18,
            paddingVertical: 12,
        },
        md: {
            ...theme.typography.body2Strong,
            height: 40,
            paddingHorizontal: 18,
            paddingVertical: 6,
        },
        sm: {
            ...theme.typography.body3Strong,
            height: 36,
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        //Variant Styles
        primary: {
            backgroundColor: theme.palette.primary,
            color: "#FFFFFF",
        },
        secondary: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
        },
        terciary: {
            backgroundColor: theme.palette.overlay["12%"],
            color: "#ffffff",
        },
        outlined: {
            borderColor: theme.palette.text,
            color: theme.palette.text,
        },
        text: {
            color: theme.palette.text,
        },
        //State Styles
        pressed: {
            primary: {
                backgroundColor: emphasize(theme.palette.primary, 0.3),
            },
            secondary: {
                backgroundColor: emphasize("#FFFFFF", 0.08),
            },
            terciary: {
                backgroundColor: alpha("#ffffff", 0.4),
            },
            outlined: {
                backgroundColor: emphasize(theme.palette.text, 0.7),
            },
        },
        disabled: {
            backgroundColor: theme.palette.overlay["20%"],
            color: "white",
        },
    };
});
