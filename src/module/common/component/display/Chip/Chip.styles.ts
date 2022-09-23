import { ChipRootProps, ChipTextProps } from "./Chip.types";
import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";

export const ChipRoot = styled(View)<ChipRootProps>(({ theme, variant, fullWidth }) => ({
    height: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    alignSelf: fullWidth ? undefined : "flex-start",
    backgroundColor: variant === "filled" ? theme.palette.gray[900] : "transparent",
    ...(variant === "outlined" && {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.overlay["8%"],
    }),
}));

export const ChipText = styled(Text)<ChipTextProps>(({ theme, variant }) => ({
    ...theme.typography.body3Strong,
    color: variant === "filled" ? theme.palette.gray[0] : theme.palette.overlay["60%"],
}));
