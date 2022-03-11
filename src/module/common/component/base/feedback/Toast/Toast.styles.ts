import { ToastContainerStylesProps, ToastContentStylesProps, ToastPosition } from "./Toast.types";
import { Dimensions, View } from "react-native";
import styled from "@peersyst/react-native-styled";
import { Paper } from "../../surface/Paper";
import { Icon } from "react-native-components";

const width = Dimensions.get("window").width;

function getPosition(position: ToastPosition): { bottom: number | undefined; left: number; top: number | undefined } {
    switch (position) {
        case "bottom":
            return {
                bottom: 24,
                left: 24,
                top: undefined,
            };
        case "top":
            return {
                top: 24,
                left: 24,
                bottom: undefined,
            };
    }
}

export const ToastContainer = styled(View)<ToastContainerStylesProps>(
    ({ position, theme, safeAreaInsets: { top: topInset, left: leftInset, bottom: bottomInset } }) => {
        const { left, bottom, top } = getPosition(position);
        return {
            position: "absolute",
            left: left + leftInset,
            bottom: bottom ? bottom + bottomInset : undefined,
            top: top ? top + topInset : undefined,
            zIndex: theme.zIndex.toast,
        };
    },
);

export const ToastContent = styled(Paper)<ToastContentStylesProps>(({ theme, type }) => {
    const statusColor = type && type !== "loading" ? theme.palette.status[type] : undefined;
    return {
        flex: 1,
        justifyContent: "center",
        minHeight: 56,
        width: width - 48,
        padding: 14,
        borderRadius: theme.borderRadius,
        backgroundColor: statusColor || theme.palette.background,
        elevation: 0,
    };
});

export const ToastAction = styled(Icon)(() => ({
    alignSelf: "flex-end",
}));
