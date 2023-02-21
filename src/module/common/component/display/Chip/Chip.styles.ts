import { ChipRootProps, ChipSize, ChipTextProps } from "./Chip.types";
import styled from "@peersyst/react-native-styled";
import { View, Text, ViewStyle } from "react-native";

const CHIP_ROOT_STYLES: Record<ChipSize, ViewStyle> = {
    md: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    sm: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
};

export const ChipRoot = styled(View)<ChipRootProps>(({ theme, variant, fullWidth, size = "md" }) => {
    return {
        ...CHIP_ROOT_STYLES[size],
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100, //Rounded
        alignSelf: fullWidth ? undefined : "flex-start",
        ...(variant === "outlined" && {
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: theme.palette.overlay["8%"],
            backgroundColor: "transparent",
        }),
        ...(variant === "glass" && {
            backgroundColor: theme.palette.overlay["20%"],
        }),
        ...(variant === "filled" && {
            backgroundColor: theme.palette.gray["900"],
        }),
    };
});

export const ChipText = styled(Text)<ChipTextProps>(({ theme, variant = "filled", size }) => ({
    ...theme.typography[size === "sm" ? "body4Strong" : "body3Strong"],
    ...(variant === "outlined" && {
        color: theme.palette.overlay["60%"],
    }),
    ...(variant === "glass" && {
        color: theme.palette.white,
    }),
    ...(variant === "filled" && {
        color: theme.palette.gray[0],
    }),
}));
