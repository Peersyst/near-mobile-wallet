import { useEffect, useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { SwitchElementWrapper, SwitchThumb, SwitchTrack, SwitchWrapper } from "./Switch.styles";
import { HandleLayoutParams, SwitchProps, SwitchStyle } from "./Switch.types";
import { FormControl, Label, LabelStyle, useGlobalStyles, useMergeDefaultProps } from "@peersyst/react-native-components";
import useGetSwitchColors from "./hooks/useGetSwitchColors";
import switchStylesMergeStrategy from "./utils/switchStylesMergeStrategy";
import { useGetDefaultStyles } from "./hooks/useGetDefaultStyles";

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

    //Styles
    const globalStyles = {};
    const defaultStyles = useGetDefaultStyles();
    const getSwitchColors = useGetSwitchColors();

    //States
    const [innverValue, setInnerValue] = useState<boolean>(defaultValue);
    const [wrapperWidth, setWrapperWidth] = useState<number>(0);
    const [thumbWidth, setThumbWidth] = useState<number>(0);

    //Base animation
    const baseAnim = useRef(new Animated.Value(0)).current;

    //Trigger animation on value change
    useEffect(() => {
        Animated.timing(baseAnim, {
            toValue: innverValue ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
            ...animationConfig,
        }).start();
    }, [innverValue]);

    /**
     * SwitchTrack position animation
     * It cannot be a ref because it has to be updated
     * when the wrapper and track width update
     */
    const tXAnim = baseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, wrapperWidth - thumbWidth],
    });

    /**
     * Oposite opacity animation
     * used to hide the child element
     * when the switch's value changes
     */
    const opacityAnim = useRef(baseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })).current;

    /**
     * Needed in order to gain knowledge of the humb and track,
     * as their widths may vary, so translations can be performed correctly
     */
    const handleLayout = ({ nativeEvent: { layout: newLayout }, type }: HandleLayoutParams) => {
        if (type === "thumbWidth") setThumbWidth(newLayout.width);
        else setWrapperWidth(newLayout.width);
    };

    return (
        <FormControl<boolean, LabelStyle, SwitchStyle>
            Label={[LabelProp, { placement: "left", ...LabelProps }]}
            defaultValue={defaultValue}
            disabled={disabled}
            hideError={hideError}
            stylesMergeStrategy={(...mergeStyles) => switchStylesMergeStrategy(innverValue, ...mergeStyles)}
            defaultStyle={defaultStyles}
            globalStyle={globalStyles}
            style={styleProp}
            readonly={readonly}
            {...rest}
        >
            {(value, setValue, _, style) => {
                const handleChange = () => {
                    setValue(!value);
                    if (!readonly && !disabled) setInnerValue(!value);
                };

                const { thumb: thumbStyles, ...trackStyles } = style;

                const { thumbBgColor, inactiveTrackBgColor, trackBgColor } = getSwitchColors({
                    thumbBgColor: thumbStyles?.backgroundColor,
                    inactiveTrackBgColor: trackStyles.backgroundColor,
                    trackBgColor: trackStyles?.backgroundColor,
                });

                //FinalThumbColor
                const trackFinalColor = onSwitchChangeBgColor
                    ? baseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [inactiveTrackBgColor, trackBgColor],
                      })
                    : trackBgColor;

                return (
                    <TouchableWithoutFeedback onPress={handleChange}>
                        <SwitchTrack style={{ ...trackStyles, backgroundColor: trackFinalColor }}>
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
                                <SwitchThumb
                                    onLayout={(e) =>
                                        handleLayout({
                                            nativeEvent: e.nativeEvent,
                                            type: "thumbWidth",
                                        })
                                    }
                                    style={{
                                        transform: [{ translateX: tXAnim }],
                                        ...thumbStyles,
                                        backgroundColor: thumbBgColor,
                                    }}
                                />
                                {!value && children && (
                                    <SwitchElementWrapper style={{ opacity: opacityAnim, justifyContent: "flex-end" }}>
                                        {children[1]}
                                    </SwitchElementWrapper>
                                )}
                            </SwitchWrapper>
                        </SwitchTrack>
                    </TouchableWithoutFeedback>
                );
            }}
        </FormControl>
    );
};

export default Switch;
