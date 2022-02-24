import { CircleIcon, FilledCircleIcon } from "icons";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { PinItemRoot } from "./PinItem.styles";

export interface PasswordCircleProps {
    active?: boolean;
    animationHeight: number;
    duration: number;
    error?: boolean;
}

const PinItem = ({ active = true, duration, animationHeight, error }: PasswordCircleProps): JSX.Element => {
    const animated = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(animated, {
                    toValue: animationHeight,
                    easing: Easing.ease,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(animated, {
                    easing: Easing.ease,
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [error, animated, animationHeight, duration]);
    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            <PinItemRoot>{active ? <FilledCircleIcon /> : <CircleIcon />}</PinItemRoot>
        </Animated.View>
    );
};

export default PinItem;
