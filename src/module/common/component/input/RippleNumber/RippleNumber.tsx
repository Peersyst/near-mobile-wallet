import { RippleNumberProps } from "./RippleNumber.types";
import { Animated, Pressable, Alert } from "react-native";
import { RippleNumberRoot, TextNumber } from "./RippleNumber.styles";
import { useEffect, useRef, useState } from "react";
import { theme } from "module/common/style/theme";

const RippleNumer = ({ number }: RippleNumberProps) => {
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim2 = useRef(new Animated.Value(0)).current;
    const opacityAnim2 = useRef(new Animated.Value(1)).current;

    const showAnim = () => {
        scaleAnim.setValue(0)
        scaleAnim2.setValue(0)
        opacityAnim.setValue(1)
        opacityAnim2.setValue(1)

            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(scaleAnim2, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 700,
                }),
                Animated.timing(opacityAnim2, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 700,
                }),
            ]).start()
    };

    return (
        <Pressable onPressIn={showAnim} style={{width:70, height:70}}>
            <RippleNumberRoot>
                <Animated.View
                    style={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: theme.palette.lightGray,
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                />
                <Animated.View
                    style={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: "white",
                        opacity: opacityAnim2,
                        transform: [{ scale: scaleAnim2 }],
                    }}
                ></Animated.View>
                <TextNumber>{number}</TextNumber>
            </RippleNumberRoot>
        </Pressable>
    );
};

export default RippleNumer;
