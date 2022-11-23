import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { ActiveIcon, ColorSampleRoot } from "module/common/component/display/ColorSample/ColorSample.styles";
import { Animated } from "@peersyst/react-native-components";

const AnimatedView = Animated.createAnimatedComponent.scale(View, { duration: 150 });

export interface ColorSampleProps {
    color: string;
    active?: boolean;
    onPress?: (color: string) => unknown;
    style?: ViewStyle;
}

const ColorSample = ({ active = false, onPress, color, ...rest }: ColorSampleProps): JSX.Element => (
    <TouchableWithoutFeedback onPress={() => onPress?.(color)}>
        <ColorSampleRoot color={color} accessibilityRole={onPress ? "button" : undefined} {...rest}>
            <AnimatedView in={active}>
                <ActiveIcon />
            </AnimatedView>
        </ColorSampleRoot>
    </TouchableWithoutFeedback>
);

export default ColorSample;
