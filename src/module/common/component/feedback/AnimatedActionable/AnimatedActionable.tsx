import { Swipeable } from "react-native-gesture-handler";
import { AnimatedActionableProps } from "./AnimatedActionable.types";
import { Animated, TouchableOpacity } from "react-native";
import { AnimatedActionableRoot, ActionableLabel } from "./AnimatedActionable.styles";

const AnimatedActionable = ({
    onSwipedAction,
    swipedAction,
    children,
    swipeDirection = "right",
    swipedActionProps = {},
    enabled = true,
    ...rest
}: AnimatedActionableProps): JSX.Element => {
    const { labelProps, ...props } = swipedActionProps;

    const renderAction = () => {
        return (
            <TouchableOpacity onPress={onSwipedAction}>
                <Animated.View {...props}>
                    <ActionableLabel variant="body3Strong" {...labelProps}>
                        {swipedAction}
                    </ActionableLabel>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const swipeableProps = {
        renderLeftActions: swipeDirection === "left" && enabled ? renderAction : undefined,
        renderRightActions: swipeDirection === "right" && enabled ? renderAction : undefined,
    };

    return (
        <AnimatedActionableRoot {...rest}>
            <Swipeable {...swipeableProps}>{children}</Swipeable>
        </AnimatedActionableRoot>
    );
};

export default AnimatedActionable;
