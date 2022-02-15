import { ChipRootProps, ChipTextProps } from "./Chip.types";
import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";

export const ChipRoot = styled(View)<ChipRootProps>(({ theme, appearance, fullWidth }) =>
({
    height: 48,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    shadowColor: theme.palette.fullBlack,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    alignSelf: fullWidth ? undefined : "flex-start",
    backgroundColor: appearance === "light" ? (theme.palette.lighterGray) : (theme.palette.black)
}))

export const ChipText = styled(Text)<ChipTextProps>(({ theme, appearance }) =>
({
    fontSize: 18,
    color: appearance === "light" ? theme.palette.darkFont : theme.palette.white
}))