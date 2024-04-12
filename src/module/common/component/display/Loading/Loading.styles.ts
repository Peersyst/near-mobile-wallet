import { CircularProgress } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { NearLoadingIcon } from "icons";
import { LoadingProps } from "./Loading.types";

export const LoadingRoot = styled(CircularProgress)<LoadingProps>(({ theme, size }) => ({
    size: size === "lg" ? 120 : 80,
    thickness: 3,
    color: theme.palette.white,
    backgroundColor: theme.palette.overlay["20%"],
}));

export const LoadingIcon = styled(NearLoadingIcon)<LoadingProps>(({ theme, size }) => ({
    color: theme.palette.white,
    fontSize: size === "lg" ? 48 : 24,
}));
