import { CircleIcon, FilledCircleIcon } from "icons";
import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { PasswordCircleRoot } from "./PasswordCircle.styles";

export interface PasswordCircleProps {
    active?: boolean;
    height: number;
    delay: number;
    duration: number;
    error?: boolean;
}

const PasswordCircle = ({ active = true, duration, height, delay, error }: PasswordCircleProps): JSX.Element => {
    const animated = new Animated.Value(0);
    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(animated, {
                    toValue: height,
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
    }, [error]);
    return (
        <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
            <PasswordCircleRoot>{active ? <FilledCircleIcon /> : <CircleIcon />}</PasswordCircleRoot>
        </Animated.View>
    );
};

export default PasswordCircle;
