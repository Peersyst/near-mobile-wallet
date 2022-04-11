import styled from "@peersyst/react-native-styled";
import { Paper } from "../../surface/Paper";
import { IconButton } from "../../input/IconButton";

export const ModalRoot = styled(Paper)(({ theme, dimensions: { width, height } }) => ({
    maxHeight: height * 0.8,
    maxWidth: width * 0.8,
    padding: 20,
    backgroundColor: theme.palette.background,
    borderRadius: theme.borderRadius,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 18,
    color: theme.palette.text,
}));
