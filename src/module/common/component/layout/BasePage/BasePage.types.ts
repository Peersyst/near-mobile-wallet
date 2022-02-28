import { ReactNode } from "react";
import { PaletteMode } from "react-native-components";

export interface BasePageProps {
    appearance?: PaletteMode;
    header?: boolean;
    children?: ReactNode;
    showIcons?: boolean;
}
