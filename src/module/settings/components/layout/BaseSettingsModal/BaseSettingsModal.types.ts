import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import { ExposedBackdropProps } from "@peersyst/react-native-components";

export type BaseSettingsModalScreenProps = Pick<NavbarProps, "title" | "logo"> & {
    children: ReactNode;
} & ExposedBackdropProps;
