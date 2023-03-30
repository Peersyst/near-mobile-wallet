import { TypographyProps } from "@peersyst/react-native-components";
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
    xs: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
};

const CHIP_TEXT_VARIANT: Record<ChipSize, TypographyProps["variant"]> = {
    md: "body3Strong",
    sm: "body4Strong",
    xs: "captionStrong",
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

export const ChipText = styled(Text)<ChipTextProps>(({ theme, variant = "filled", size = "md" }) => ({
    ...theme.typography[CHIP_TEXT_VARIANT[size]],
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
