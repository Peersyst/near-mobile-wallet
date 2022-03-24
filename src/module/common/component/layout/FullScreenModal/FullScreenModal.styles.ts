import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { FullScreenModalRootProps } from "./FullScreenModal.types";

export const FullScreenModalRoot = styled(View)<FullScreenModalRootProps>(() => ({
    flex: 1
}))