import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface CardModalChildren {
    header: ReactNode;
    body: ReactNode;
}

export type CardModalStyle = ViewStyle & {
    body?: ViewStyle;
};

export type CardModalProps = ExposedBackdropProps & {
    style?: CardModalStyle;
    children: ((open: boolean, setOpen: (value: boolean) => unknown) => CardModalChildren) | CardModalChildren;
};
