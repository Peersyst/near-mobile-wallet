import { ReactNode } from "react";
import { ExposedBackdropProps, PaletteMode } from "react-native-components";
import { NavbarProps } from "../../navigation/Navbar/Navbar.types";

export interface FullScreenModalRootProps {
    appearance?: PaletteMode;
    children?: ReactNode;
}

export type FullScreenModalProps = ExposedBackdropProps & NavbarProps & FullScreenModalRootProps;