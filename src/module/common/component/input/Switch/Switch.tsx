import { useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { SwitchElementWrapper, SwitchThumb, SwitchTrack, SwitchWrapper } from "./Switch.styles";
import { HandleLayoutParams, SwitchProps, SwitchStyle, SwitchWidths } from "./Switch.types";
import { FormControl, Label, LabelStyle, useMergeDefaultProps } from "@peersyst/react-native-components";
import useGetSwitchColors from "./hooks/useGetSwitchColors";
import { switchStylesMergeStrategy } from "./hooks/switchStylesMergeStrategy";

const Switch = (props: SwitchProps): JSX.Element => {
    const {
        defaultValue = false,
        disabled = false,
        readonly = false,
        LabelProps = {},
        hideError = true,
        Label: LabelProp = Label,
        animationConfig,
        children,
        style: styleProp = { component: {} },
        onSwitchChangeBgColor = true,
        ...rest
    } = useMergeDefaultProps("Select", props);

    const [{ wrapperWidth, trackWidth }, setWrapperWidth] = useState<SwitchWidths>({
        trackWidth: 0,
        wrapperWidth: 0,
    });
    const baseAnim = useRef(new Animated.Value(0)).current;

    //Styles
    const globalStyles = {};
    const { track: trackStyles, thumb: thumbStyles } = switchStylesMergeStrategy(globalStyles, styleProp?.component || {}, disabled);
    const { backgroundColor, inactiveBackgroundColor, ...thumbStylesRes } = thumbStyles || {};

    const { thumbBgColor, inactiveThumbBgColor, trackBgColor } = useGetSwitchColors({
        thumbBgColor: thumbStyles?.backgroundColor,
        inactiveThumbBgColor: thumbStyles?.inactiveBackgroundColor,
        trackBgColor: trackStyles?.backgroundColor,
    });

    //Track position animation
    const tXAnim = baseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, wrapperWidth - trackWidth],
    });
    //Bg color animation
    const colorAnim = useRef(
        baseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inactiveThumbBgColor, thumbBgColor],
        }),
    ).current;
    //Oposite opactiy animation
    const opacityAnim = useRef(baseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })).current;

    const handleSetValue = (value: boolean) => {
        Animated.timing(baseAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
            ...animationConfig,
        }).start();
    };

    //On components mounted define the width of the wrapper and the track
    //They will be necessary to position the track
    const handleLayout = ({ nativeEvent: { layout: newLayout }, type }: HandleLayoutParams) => {
        setWrapperWidth((wrapperWidth) => ({
            ...wrapperWidth,
            [type]: newLayout.width,
        }));
    };

    return (
        <FormControl<boolean, LabelStyle, SwitchStyle>
            Label={[LabelProp, { placement: "left", ...LabelProps }]}
            defaultValue={defaultValue}
            disabled={disabled}
            hideError={hideError}
            defaultStyle={globalStyles}
            style={styleProp}
            readonly={readonly}
            {...rest}
        >
            {(value, setValue) => {
                const updateValue = () => {
                    setValue(!value);
                    if (!readonly && !disabled) handleSetValue(!value);
                };

                return (
                    <TouchableWithoutFeedback onPress={updateValue}>
                        <SwitchThumb
                            disabled={disabled}
                            {...thumbStylesRes}
                            backgroundColor={onSwitchChangeBgColor ? colorAnim : thumbBgColor}
                        >
                            <SwitchWrapper
                                onLayout={(e) =>
                                    handleLayout({
                                        nativeEvent: e.nativeEvent,
                                        type: "wrapperWidth",
                                    })
                                }
                            >
                                {value && children && (
                                    <SwitchElementWrapper style={{ opacity: baseAnim, justifyContent: "flex-start" }}>
                                        {children[0]}
                                    </SwitchElementWrapper>
                                )}
                                <SwitchTrack
                                    backgroundColor={trackBgColor}
                                    onLayout={(e) =>
                                        handleLayout({
                                            nativeEvent: e.nativeEvent,
                                            type: "trackWidth",
                                        })
                                    }
                                    style={{
                                        transform: [{ translateX: tXAnim }],
                                    }}
                                />
                                {!value && children && (
                                    <SwitchElementWrapper style={{ opacity: opacityAnim, justifyContent: "flex-end" }}>
                                        {children[1]}
                                    </SwitchElementWrapper>
                                )}
                            </SwitchWrapper>
                        </SwitchThumb>
                    </TouchableWithoutFeedback>
                );
            }}
        </FormControl>
    );
};

export default Switch;
