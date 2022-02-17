import { Animated } from "react-native";
import { useRef } from "react";
import { RippleAnimCircleProps } from "./RippleAnimCircle.types";
import { RippleAnimCircleRoot, Ripple } from "./RippleAnimCircle.styles";

const RippleAnimCircle = ({ scaleStart = 0.5, size, zIndex, color1, color2, duration = 200 }: RippleAnimCircleProps): JSX.Element => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim2 = useRef(new Animated.Value(0)).current;
    const opacityAnim2 = useRef(new Animated.Value(1)).current;

    const showAnim = () => {
        scaleAnim.setValue(scaleStart);
        scaleAnim2.setValue(scaleStart);
        opacityAnim.setValue(0.8);
        opacityAnim2.setValue(0.8);
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                useNativeDriver: true,
                duration: duration / 2,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                useNativeDriver: true,
                duration: duration / 2,
            }),
            Animated.timing(scaleAnim2, {
                toValue: 1,
                useNativeDriver: true,
                duration: duration,
            }),
            Animated.timing(opacityAnim2, {
                toValue: 0,
                useNativeDriver: true,
                duration: duration,
            }),
        ]).start();
    };
    return (
        <RippleAnimCircleRoot testID="rippleAnim" onPressIn={showAnim} size={size} zIndex={zIndex}>
            <Ripple
                color={color1}
                size={size}
                style={{
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }],
                }}
            />
            <Ripple
                size={size}
                color={color2}
                style={{
                    opacity: opacityAnim2,
                    transform: [{ scale: scaleAnim2 }],
                }}
            />
        </RippleAnimCircleRoot>
    );
};

export default RippleAnimCircle;
