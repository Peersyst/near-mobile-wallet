import { RowProps } from "@peersyst/react-native-components";
import { ReactElement } from "react";

type ActionablePosition = "left" | "right";

export interface ActionableProps extends RowProps {
    action: ReactElement;
    onAction: () => void;
    position?: ActionablePosition;
}
