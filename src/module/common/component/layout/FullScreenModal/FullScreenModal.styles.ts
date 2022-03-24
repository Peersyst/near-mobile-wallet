import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { FullScreenModalRootProps } from "./FullScreenModal.types";

export const FullScreenModalRoot = styled(View)<FullScreenModalRootProps>(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.background : theme.palette.fullBlack
}))