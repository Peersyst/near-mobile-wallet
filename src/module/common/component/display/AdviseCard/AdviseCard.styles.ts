import styled from "@peersyst/react-native-styled";
import { IconButton } from "react-native-components";

export const BackIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.darkGray,
    fontSize: 26,
}));
