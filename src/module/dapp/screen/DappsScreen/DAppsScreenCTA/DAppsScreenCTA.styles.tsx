import { Col, Image, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ImageBackground, View } from "react-native";

export const DAppsScreenCTARoot = styled(Row)(({ theme }) => ({
    borderRadius: 16,
    position: "relative",
    paddingHorizontal: 20,
    backgroundColor: theme.palette.background,
}));

export const DAppsScreenCTAContent = styled(Col)(() => ({ zIndex: 2, width: "100%", padding: 20, alignItems: "center", rowGap: 6 }));

export const DAppsScreenCTAImageBackground = styled(ImageBackground)(() => ({
    width: "100%",
    borderRadius: 20,
    zIndex: 1,
    position: "absolute",
    height: "100%",
}));

export const DAppsImageWrapper = styled(View)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderRadius: 10,
    padding: 2,
    width: 44,
    height: 44,
}));

export const DAppsImage = styled(Image)(() => ({
    width: "100%",
    height: "100%",
    borderRadius: 10,
}));
