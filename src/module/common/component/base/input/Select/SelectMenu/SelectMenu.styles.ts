import styled from "@peersyst/react-native-styled";
import { Modal } from "../../../feedback/Modal";
import { SelectItemsViewProps } from "./SelectMenu.types";
import { View } from "react-native";

export const SelectMenuRoot = styled(Modal)(() => ({
    width: "100%",
    padding: 0,
    overflow: "hidden",
}));

export const SelectItemsView = styled(View)<SelectItemsViewProps>(({ itemCount }) => ({
    height: Math.min(220, itemCount * 60),
}));
