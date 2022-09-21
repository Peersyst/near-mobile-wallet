import styled from "@peersyst/react-native-styled";
import { Backdrop, Typography } from "@peersyst/react-native-components";
import { SuccessIcon as BaseSuccessIcon } from "icons";
import BaseGoBack from "module/transaction/component/navigation/GoBack";

export const LoadingModalBackdrop = styled(Backdrop)(() => ({
    backgroundColor: "black",
}));

export const SuccessIcon = styled(BaseSuccessIcon)(() => ({
    fontSize: 70,
}));

export const SuccessMessage = styled(Typography)(() => ({
    position: "absolute",
    top: "50%",
    marginTop: 55,
}));

export const GoBack = styled(BaseGoBack)(() => ({
    position: "absolute",
    bottom: 20,
}));
