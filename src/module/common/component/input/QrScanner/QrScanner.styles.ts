import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { QrScannerMarkProps } from "module/common/component/input/QrScanner/QrScanner.types";

export const QrScannerMarksWrapper = styled(View)(({ dimensions }) => {
    const size = dimensions.width * 0.75;

    return {
        alignSelf: "center",
        width: size,
        height: size,
        top: "20%",
    };
});

export const QrScannerMark = styled(View)<QrScannerMarkProps>(({ theme, position }) => {
    const isLeft = position === "tl" || position === "bl";
    const isRight = position === "tr" || position === "br";
    const isTop = position === "tl" || position === "tr";
    const isBottom = position === "bl" || position === "br";
    const borderWidth = 2;
    const borderStyle = "solid";
    const borderRadius = theme.borderRadiusSm;

    return {
        position: "absolute",
        width: 24,
        height: 24,
        borderColor: "#FFF",
        borderStyle,
        borderLeftWidth: isLeft ? borderWidth : undefined,
        borderRightWidth: isRight ? borderWidth : undefined,
        borderTopWidth: isTop ? borderWidth : undefined,
        borderBottomWidth: isBottom ? borderWidth : undefined,
        borderTopLeftRadius: isLeft && isTop ? borderRadius : undefined,
        borderTopRightRadius: isRight && isTop ? borderRadius : undefined,
        borderBottomLeftRadius: isLeft && isBottom ? borderRadius : undefined,
        borderBottomRightRadius: isRight && isBottom ? borderRadius : undefined,
        left: isLeft ? 0 : undefined,
        top: isTop ? 0 : undefined,
        right: isRight ? 0 : undefined,
        bottom: isBottom ? 0 : undefined,
    };
});
