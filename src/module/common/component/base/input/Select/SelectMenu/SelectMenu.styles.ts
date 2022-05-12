import styled from "@peersyst/react-native-styled";
import { Modal } from "../../../feedback/Modal";
import { SelectItemsViewProps } from "./SelectMenu.types";
import { View } from "react-native";

export const SelectMenuRoot = styled(Modal)(({ dimensions: { width } }) => ({
    width: width - 60,
    padding: 0,
    overflow: "hidden",
    height: "50%",
    maxHeight: 400,
}));

export const SelectItemsView = styled(View)<SelectItemsViewProps>(() => ({
    flex: 1,
}));
