import { CircularProgress } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { NearLoadingIcon } from "icons";

export const LoadingRoot = styled(CircularProgress)(({ theme }) => ({
    size: 120,
    thickness: 3,
    color: theme.palette.white,
    backgroundColor: theme.palette.overlay["20%"],
}));

export const LoadingIcon = styled(NearLoadingIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 48,
}));
