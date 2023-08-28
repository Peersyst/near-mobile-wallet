import { RowProps } from "@peersyst/react-native-components";
import { TypographyProps } from "../../display/Typography/Typography";
import { ViewProps } from "react-native";

export interface SwipedActionProps extends ViewProps {
    labelProps?: TypographyProps;
}

export interface AnimatedActionableProps extends RowProps {
    swipedAction: string;
    onSwipedAction: () => void;
    swipedActionProps?: SwipedActionProps;
    swipeDirection?: "left" | "right";
    enabled?: boolean;
}
