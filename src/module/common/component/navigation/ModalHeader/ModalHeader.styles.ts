import { IconButton } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const ModalHeaderRoot = styled(View)(({ theme }) => ({
    width: "100%",
    minHeight: 64,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.component.navbar.borderColor,
    backgroundColor: theme.palette.component.paper,
}));

export const BackIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    left: 0,
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));

export const DismissalIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: 0,
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));
