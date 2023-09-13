import { ColProps, RowProps, TypographyStyle } from "@peersyst/react-native-components";

export interface AnimatedActionableStyle {
    rootStyle?: RowProps["style"];
    swipedRightActionStyle?: TypographyStyle;
    swipedLeftActionStyle?: TypographyStyle;
}

export interface AnimatedActionableProps extends Omit<ColProps, "style"> {
    swipedRightAction?: string;
    swipedLeftAction?: string;
    onSwipedRightAction?: () => void;
    onSwipedLeftAction?: () => void;
    enabled?: boolean;
    style?: AnimatedActionableStyle;
}
