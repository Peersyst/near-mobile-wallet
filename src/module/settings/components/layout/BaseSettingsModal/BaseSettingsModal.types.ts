import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ViewStyle } from "react-native";

export type BaseSettingsModalScreenProps = Pick<NavbarProps, "title"> & {
    children: ReactNode;
    style?: ViewStyle;
} & ExposedBackdropProps;
