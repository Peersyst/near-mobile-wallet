import { Button } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ButtonProps } from "./Button.types";
import { emphasize } from "@peersyst/react-utils";

export const ButtonRoot = styled(Button)<ButtonProps>(({ theme, rounded = true }) => {
    const themeMode = theme.palette.mode;
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
        tertiary: {
            backgroundColor: theme.palette.overlay["12%"],
            color: "#ffffff",
        },
        quaternary: {
            backgroundColor: "#FFFFFF",
            color: theme.palette.blue,
        },
        contrast: {
            backgroundColor: theme.palette.gray[themeMode === "light" ? "600" : "900"],
            color: theme.palette.red,
        },
        outlined: {
            borderColor: theme.palette.text,
            color: theme.palette.text,
            borderWidth: 1,
        },
        text: {
            color: theme.palette.text,
        },
        destructive: {
            color: theme.palette.white,
            backgroundColor: theme.palette.status.error,
        },
        glass: {
            backgroundColor: theme.palette.overlay["8%"],
            color: "#FFFFFF",
        },
        quinary: {
            backgroundColor: emphasize(theme.palette.primary, 0.9),
            color: theme.palette.primary,
        },

        //State Styles
        pressed: {
            primary: {
                backgroundColor: emphasize(theme.palette.primary, 0.15),
            },
            secondary: {
                backgroundColor: emphasize("#FFFFFF", 0.02),
            },
            tertiary: {
                backgroundColor: theme.palette.overlay["20%"],
            },
            outlined: {
                backgroundColor: theme.palette.overlay["8%"],
            },
            contrast: {
                backgroundColor: emphasize(theme.palette.gray[themeMode === "light" ? "600" : "900"], 0.15),
            },
            destructive: {
                backgroundColor: emphasize(theme.palette.status.error, 0.15),
            },
            quinary: {
                backgroundColor: emphasize(theme.palette.primary, 0.7),
            },
        },
        disabled: {
            backgroundColor: theme.palette.overlay["20%"],
            color: "white",
            variant: {
                outlined: {
                    backgroundColor: "transparent",
                    color: theme.palette.overlay["20%"],
                    borderColor: theme.palette.overlay["20%"],
                },
                text: {
                    backgroundColor: "transparent",
                    color: theme.palette.overlay["20%"],
                },
            },
        },
    };
});
