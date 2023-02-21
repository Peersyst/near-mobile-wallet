import PinItem from "./PinItem/PinItem";
import { PinDisplayRoot } from "./PinDisplay.styles";
import Typography from "../Typography/Typography";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { alpha } from "@peersyst/react-utils";

export interface PinDisplayProps {
    length: number;
    placeholder?: string;
    error?: boolean;
}

const PinDisplay = ({ length, error, placeholder }: PinDisplayProps): JSX.Element => {
    const errorAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(errorAnimation, {
                    toValue: 5,
                    easing: Easing.ease,
                    duration: 50,
                    useNativeDriver: false,
                }),
                Animated.timing(errorAnimation, {
                    easing: Easing.ease,
                    toValue: -5,
                    duration: 50,
                    useNativeDriver: false,
                }),
                Animated.timing(errorAnimation, {
                    easing: Easing.ease,
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [error]);

    return (
        <PinDisplayRoot style={{ transform: [{ translateX: errorAnimation }] }}>
            {length || !placeholder ? (
                [...Array(4)].map((_, i) => <PinItem key={i} active={i < length} />)
            ) : (
                <Typography variant="body2Strong" color={(palette) => alpha(palette.white, 0.6)}>
                    {placeholder}
                </Typography>
            )}
        </PinDisplayRoot>
    );
};

export default PinDisplay;
