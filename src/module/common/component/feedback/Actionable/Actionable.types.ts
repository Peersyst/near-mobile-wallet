import { RowProps } from "@peersyst/react-native-components";
import { ButtonProps } from "../../input/Button/Button.types";

type ActionablePosition = "left" | "right";

export interface ActionableProps extends RowProps {
    onAction: () => void;
    actionText: string;
    actionProps?: ButtonProps;
    position?: ActionablePosition;
}
