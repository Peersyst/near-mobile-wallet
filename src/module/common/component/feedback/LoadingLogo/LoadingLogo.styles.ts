import { CircularProgress } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { NearLoadingIcon } from "icons";
import { LoadingLogoIconProps, LoadingLogoRootProps } from "./LoadingLogo.types";
import { alpha } from "@peersyst/react-utils";

export const LoadingLogoIconRoot = styled(CircularProgress)<LoadingLogoRootProps>(({ size, color }) => ({
    size,
    thickness: 3,
    color,
    backgroundColor: alpha(color, 0.2),
}));

export const LoadingLogoIcon = styled(NearLoadingIcon)<LoadingLogoIconProps>(({ size, color }) => ({
    color,
    fontSize: size * 0.4,
}));
