import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { IconButton } from "module/common/component/base";
import Constants from "expo-constants";

export const IdleQrScanner = styled(View)(() => ({
    width: "100%",
    height: "100%",
    backgroundColor: "black",
}));

export const QrScannerRoot = styled(View)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
}));

export const BackButton = styled(IconButton)(() => ({
    position: "absolute",
    left: 20,
    top: 30 + Constants.statusBarHeight,
    zIndex: 1,
}));
