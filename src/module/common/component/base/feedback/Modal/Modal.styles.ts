import styled from "@peersyst/react-native-styled";
import { Paper } from "../../surface/Paper";

export const ModalRoot = styled(Paper)(({ theme }) => ({
    maxHeight: "80%",
    maxWidth: "80%",
    padding: 20,
    backgroundColor: theme.palette.background,
    borderRadius: theme.borderRadius,
    elevation: 0,
}));
