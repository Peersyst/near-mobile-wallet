import { CircularProgress, Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { NearLoadingIcon } from "icons";
import GradientPage from "../../layout/GradientPage/GradientPage";

export const UpdatingAppContainer = styled(Col)(() => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 5,
}));

export const UpdatingAppLoading = styled(CircularProgress)(({ theme }) => ({
    size: 120,
    thickness: 3,
    color: theme.palette.white,
    backgroundColor: theme.palette.overlay["20%"],
}));

export const UpdatingAppIcon = styled(NearLoadingIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 48,
}));

export const UpdatingAppModalPage = styled(GradientPage, { gradient: true })(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
}));
