import { ButtonProps, SwipeButtonProps } from "@peersyst/react-native-components";
import { PropsWithChildren } from "react";

type SignatureScaffoldSwipeButtonProps = Omit<SwipeButtonProps, "children" | "onSwipe" | "fullWidth">;

type SignatureScaffoldButtonProps = Omit<ButtonProps, "children" | "onPress" | "fullWidth">;

export interface SignatureScaffoldProps extends PropsWithChildren {
    onSign: () => void;
    onReject: () => void;
    sign?: SignatureScaffoldSwipeButtonProps;
    reject?: SignatureScaffoldButtonProps;
}
