import { useEffect, useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { SwitchElementWrapper, SwitchThumb, SwitchTrack, SwitchWrapper } from "./Switch.styles";
import { HandleLayoutParams, SwitchProps, SwitchWidths } from "./Switch.types";
import { Animated as GenesysAnimated } from "@peersyst/react-native-components";

const AnimatedComponent = GenesysAnimated.createAnimatedComponent.fade(SwitchElementWrapper, { duration: 200 });

const Switch = ({
    animationConfig,
    LeftComponent,
    RightComponent,
    style: { thumb: thumbStyles, track: trackStyles } = {},
}: SwitchProps): JSX.Element => {
    const [value, setValue] = useState(false);
    const [{ wrapperWidth, trackWidth }, setWrapperWidth] = useState<SwitchWidths>({ trackWidth: 0, wrapperWidth: 0 });
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: value ? wrapperWidth - trackWidth : 0,
            duration: 200,
            useNativeDriver: false,
            ...animationConfig,
        }).start();
    }, [value]);

    const handleSetValue = () => {
        setValue((value) => !value);
    };

    const handleLayout = ({ nativeEvent: { layout: newLayout }, type }: HandleLayoutParams) => {
        setWrapperWidth((wrapperWidth) => ({
            ...wrapperWidth,
            [type]: newLayout.width,
        }));
    };

    return (
        <TouchableWithoutFeedback onPress={handleSetValue}>
            <SwitchThumb {...thumbStyles}>
                <SwitchWrapper onLayout={(e) => handleLayout({ nativeEvent: e.nativeEvent, type: "wrapperWidth" })}>
                    {value && (
                        <AnimatedComponent in={value} justifyContent="flex-start">
                            {LeftComponent}
                        </AnimatedComponent>
                    )}
                    <SwitchTrack
                        {...trackStyles}
                        onLayout={(e) => handleLayout({ nativeEvent: e.nativeEvent, type: "trackWidth" })}
                        style={{ transform: [{ translateX: widthAnim }] }}
                    />
                    {!value && (
                        <AnimatedComponent in={!value} justifyContent="flex-end">
                            {RightComponent}
                        </AnimatedComponent>
                    )}
                </SwitchWrapper>
            </SwitchThumb>
        </TouchableWithoutFeedback>
    );
};

export default Switch;
