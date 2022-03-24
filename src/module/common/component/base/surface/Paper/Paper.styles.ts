import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { PaperOverlayProps, PaperRootProps } from "module/common/component/base/surface/Paper/Paper.types";
import { alpha } from "@peersyst/react-utils";

const getOverlayAlpha = (elevation: number): number => {
    let alphaValue;
    if (elevation < 1) {
        alphaValue = 5.11916 * elevation ** 2;
    } else {
        alphaValue = 4.5 * Math.log(elevation + 1) + 2;
    }
    return Number((alphaValue / 100).toFixed(2));
};

export const PaperRoot = styled(View)<PaperRootProps>(({ theme, elevation, square }) => ({
    backgroundColor: theme.palette.lightGray,
    borderRadius: square ? 0 : theme.borderRadius,
    ...theme.shadows[elevation],
}));

export const PaperOverlay = styled(View)<PaperOverlayProps>(({ elevation, theme, square }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    elevation: -1,
    backgroundColor: theme.palette.mode === "dark" ? alpha("#fff", getOverlayAlpha(elevation)) : "transparent",
    borderRadius: square ? 0 : theme.borderRadius,
}));
