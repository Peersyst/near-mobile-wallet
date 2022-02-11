import { StyleSheet } from "react-native"
import { ChipStylesProps, ChipRootProps } from "./Chip.types";
import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";

export const ChipRoot = styled(View)<ChipRootProps>(({ theme, variant }) =>
({
    height: 48,
    paddingHorizontal: 20,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    shadowColor: theme.palette.fullBlack,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 12,
    backgroundColor: variant === "light" ? (theme.palette.lighterGray) : (theme.palette.black)
}))

export const ChipText = styled(Text)<ChipRootProps>(({ theme, variant }) =>
({
    fontSize: 18,
    marginBottom: 2,
    color: variant === "light" ? theme.palette.darkFont : theme.palette.white
}))

export const ChipStyles = StyleSheet.create({
    notFullWidth: {
        alignSelf: "flex-start",
    }
})