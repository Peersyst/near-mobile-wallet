import { useRef, useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { SwitchElementWrapper, SwitchThumb, SwitchTrack, SwitchWrapper } from "./Switch.styles";
import { HandleLayoutParams, SwitchProps, SwitchStyle, SwitchWidths } from "./Switch.types";
import {
    FormControl,
    FormControlStateStyle,
    Label,
    LabelStyle,
    useGlobalStyles,
    useMergeDefaultProps,
} from "@peersyst/react-native-components";
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

    const [{ wrapperWidth, trackWidth }, setWrapperWidth] = useState<SwitchWidths>({
        trackWidth: 0,
        wrapperWidth: 0,
    });

    //Base animation
    const baseAnim = useRef(new Animated.Value(0)).current;
    const triggerAnimation = (value: boolean) => {
        Animated.timing(baseAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
            ...animationConfig,
        }).start();
    };

    //Styles
    const globalStyles: FormControlStateStyle<Partial<SwitchStyle>> = {};
    const defaultStyles = useGetDefaultStyles();
    const getSwitchColors = useGetSwitchColors();

    //SwitchTrack position animation
    //It can not be a ref because it need to be updated
    //when the wrapper + track width change
    const tXAnim = baseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, wrapperWidth - trackWidth],
    });

    //Oposite opactiy animation
    //Used to hide children element
    const opacityAnim = useRef(baseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })).current;

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
            stylesMergeStrategy={switchStylesMergeStrategy}
            defaultStyle={defaultStyles}
            globalStyle={globalStyles}
            style={styleProp}
            readonly={readonly}
            {...rest}
        >
            {(value, setValue, _, style) => {
                const updateValue = () => {
                    setValue(!value);
                    if (!readonly && !disabled) triggerAnimation(!value);
                };

                const { thumb: thumStyles, track: trackStyles } = style;
                const {
                    backgroundColor: thumbDefaultBgColor,
                    inactiveBackgroundColor: thumbDefaultInactiveBgColor,
                    ...restThumbStyles
                } = thumStyles || {};
                const { thumbBgColor, inactiveThumbBgColor, trackBgColor } = getSwitchColors({
                    thumbBgColor: thumbDefaultBgColor,
                    inactiveThumbBgColor: thumbDefaultInactiveBgColor,
                    trackBgColor: trackStyles?.backgroundColor,
                });

                //FinalThumbColor
                const colorAnim = baseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [inactiveThumbBgColor, thumbBgColor],
                });

                return (
                    <TouchableWithoutFeedback onPress={updateValue}>
                        <SwitchThumb {...restThumbStyles} backgroundColor={onSwitchChangeBgColor ? colorAnim : thumbBgColor}>
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
