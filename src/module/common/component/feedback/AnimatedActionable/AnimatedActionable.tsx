import { Swipeable } from "react-native-gesture-handler";
import { AnimatedActionableProps } from "./AnimatedActionable.types";
import { TouchableOpacity } from "react-native";
import { AnimatedActionableRoot, ActionableLabel, ActionRoot } from "./AnimatedActionable.styles";
import { TypographyStyle } from "@peersyst/react-native-components";

const AnimatedActionable = ({
    swipedRightAction,
    onSwipedRightAction,
    swipedLeftAction,
    onSwipedLeftAction,
    children,
    enabled = true,
    style = {},
    ...rest
}: AnimatedActionableProps): JSX.Element => {
    const { rootStyle, swipedLeftActionStyle, swipedRightActionStyle } = style;

    const renderAction = (swipedAction: string, onSwipedAction: () => void, swipedActionStyle: TypographyStyle = {}) => {
        return (
            <TouchableOpacity onPress={onSwipedAction}>
                <ActionRoot>
                    <ActionableLabel variant="body3Strong" style={swipedActionStyle}>
                        {swipedAction}
                    </ActionableLabel>
                </ActionRoot>
            </TouchableOpacity>
        );
    };

    const swipeableProps = {
        renderLeftActions:
            enabled && swipedLeftAction && onSwipedLeftAction
                ? () => renderAction(swipedLeftAction, onSwipedLeftAction, swipedLeftActionStyle)
                : undefined,
        renderRightActions:
            enabled && swipedRightAction && onSwipedRightAction
                ? () => renderAction(swipedRightAction, onSwipedRightAction, swipedRightActionStyle)
                : undefined,
    };

    return (
        <AnimatedActionableRoot style={rootStyle} {...rest}>
            <Swipeable {...swipeableProps}>{children}</Swipeable>
        </AnimatedActionableRoot>
    );
};

export default AnimatedActionable;
