import { ChipRootProps } from "./Chip.types";
import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { AppearanceProps } from "module/common/types";

export const ChipRoot = styled(View)<ChipRootProps>(({ theme, appearance, fullWidth }) => ({
    height: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    shadowColor: theme.palette.fullBlack,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    alignSelf: fullWidth ? undefined : "flex-start",
    backgroundColor: appearance === "light" ? theme.palette.lighterGray : theme.palette.black,
}));

export const ChipText = styled(Text)<AppearanceProps>(({ theme, appearance }) => ({
    fontSize: 14,
    color: appearance === "light" ? theme.palette.darkFont : theme.palette.white,
}));
