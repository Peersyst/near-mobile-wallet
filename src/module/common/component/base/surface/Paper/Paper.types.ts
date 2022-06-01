import { ReactNode } from "react";
import { ViewProps, ViewStyle } from "react-native";

export type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

export interface PaperProps extends ViewProps {
    /**
     * Paper elevation
     */
    elevation?: Elevation;
    /**
     * Paper has squared corners
     */
    square?: boolean;
    /**
     * Paper styles
     */
    style?: ViewStyle;
    /**
     * Paper content
     */
    children?: ReactNode;
}

export interface PaperRootProps {
    elevation: Elevation;
    square: boolean;
}

export type PaperOverlayProps = PaperRootProps;
