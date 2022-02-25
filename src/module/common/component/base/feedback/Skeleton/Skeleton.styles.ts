import styled from "@peersyst/react-native-styled";
import { Animated, View } from "react-native";
import { SkeletonAnimationProps, SkeletonOverlayProps, SkeletonRootProps, SkeletonShape } from "./Skeleton.types";
import { Theme } from "react-native-components";

const getSkeletonBorderRadius = (shape: SkeletonShape, { borderRadius }: Theme): number => {
    if (shape === "rectangular") return 0;
    else if (shape === "circular") return 9999;
    else return borderRadius;
};

export const SkeletonRoot = styled(View)<SkeletonRootProps>(({ theme, height, width, shape }) => {
    const borderRadius = getSkeletonBorderRadius(shape, theme);

    return {
        overflow: "hidden",
        width,
        height,
        borderRadius,
    };
});

export const SkeletonOverlay = styled(View)<SkeletonOverlayProps>(({ appearance: appearanceProp, theme }) => {
    const appearance = appearanceProp || theme.palette.mode;
    return {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: appearance === "light" ? "rgba(0, 0, 0, 0.11)" : "rgba(255, 255, 255, 0.13)",
    };
});

export const SkeletonAnimation = styled(Animated.View)<SkeletonAnimationProps>(({ appearance: appearanceProp, theme }) => {
    const appearance = appearanceProp || theme.palette.mode;
    return {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        backgroundColor: appearance === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.14)",
    };
});
