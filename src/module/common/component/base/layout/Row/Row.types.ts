import { FlexStyle, ViewProps } from "react-native";
import { ReactNode } from "react";

export interface RowProps extends ViewProps {
    children: ReactNode;
    flex?: number;
    gap?: number | string;
    justifyContent?: FlexStyle["justifyContent"];
    alignItems?: FlexStyle["alignItems"];
    wrap?: boolean;
}
