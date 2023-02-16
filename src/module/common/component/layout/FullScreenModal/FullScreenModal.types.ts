import { ReactNode } from "react";
import { ExposedBackdropProps, PaletteMode } from "@peersyst/react-native-components";
import { NavbarProps } from "../../navigation/Navbar/Navbar.types";
import { ViewStyle } from "react-native";

export interface FullScreenModalRootProps {
    appearance?: PaletteMode;
    children?: ReactNode;
}

export type FullScreenModalProps = ExposedBackdropProps &
    Omit<NavbarProps, "onBack" | "style"> &
    FullScreenModalRootProps & { style?: ViewStyle };
