import { IconButtonProps, RowProps, SvgIconProps } from "@peersyst/react-native-components";
import { JSXElementConstructor } from "react";

type ActionablePosition = "left" | "right";

export interface ActionableProps extends RowProps {
    Action: JSXElementConstructor<SvgIconProps>;
    onAction: () => void;
    actionProps?: Omit<IconButtonProps, "onPress">;
    position?: ActionablePosition;
}
