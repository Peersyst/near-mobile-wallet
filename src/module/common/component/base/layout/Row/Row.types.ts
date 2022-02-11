import { FlexStyle, ViewProps } from "react-native";
import { ReactNode } from "react";

export interface RowProps extends ViewProps {
    children: ReactNode;
    flex?: number;
    gap?: number;
    justifyContent?: FlexStyle["justifyContent"];
    alignItems?: FlexStyle["alignItems"];
}
