import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ImageBackground, View } from "react-native";

export const DAppsScreenCTARoot = styled(Row)(() => ({ height: 80, borderRadius: 16, position: "relative" }));

export const DAppsScreenCTAContent = styled(Row)(() => ({ position: "absolute", zIndex: 2, width: "100%", height: "100%", padding: 20 }));

export const DAppsScreenCTAImageBackground = styled(ImageBackground)(() => ({
    width: "100%",
    height: "100%",
    borderRadius: 20,
    zIndex: 1,
}));

export const DAppsScreenCTAImageBackgroundOverlay = styled(View)(() => ({
    backgroundColor: "rgba(255,255,255,0.88)",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 20,
}));
