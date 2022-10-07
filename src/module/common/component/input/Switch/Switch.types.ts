import { LabelProps, FormControlledComponentProps } from "@peersyst/react-native-components";
import { Animated, LayoutChangeEvent, OpaqueColorValue, ViewStyle } from "react-native";
import { CoreSwitchProps } from "@peersyst/react-components-core";

export interface SwitchStyle {
    /**
     * Switch thumb styles
     */
    thumb?: SwitchThumbStyle;
    /**
     * Switch track styles
     */
    track?: SwitchTrackStyle;
}

export type BaseSwitchProps = FormControlledComponentProps<CoreSwitchProps<LabelProps>, SwitchStyle>;

export interface SwitchProps extends BaseSwitchProps {
    /**
     * Animation options
     */
    animationConfig?: Omit<Parameters<typeof Animated.timing>[1], "toValue">;
    /**
     * Set to true if you want to change the bg color of the thumb when switch state changes
     * You can algo customize the color with the style { thumb: ThumbStyle } prop
     */
    onSwitchChangeBgColor?: boolean;
}

type ColorWithoutOpaqueColorValue = Exclude<ViewStyle["backgroundColor"], OpaqueColorValue>;

export interface SwitchThumbStyle {
    /**
     * width of the switch
     */
    width?: ViewStyle["width"];
    /**
     * height of the switch
     */
    height?: ViewStyle["height"];
    /**
     * Inner padding of the switch (usefull to control de trackSize)
     */
    padding?: ViewStyle["padding"];
    /**
     * Background color of the thumb
     */
    backgroundColor?: ColorWithoutOpaqueColorValue;
    /**
     * Background color of the thumb when it is not active
     */
    inactiveBackgroundColor?: ColorWithoutOpaqueColorValue;
}

export interface SwitchTrackStyle {
    /**
     * Background color of the track
     */
    backgroundColor?: ColorWithoutOpaqueColorValue;
}

export interface SwitchWidths {
    trackWidth: 0;
    wrapperWidth: 0;
}

export interface HandleLayoutParams {
    nativeEvent: LayoutChangeEvent["nativeEvent"];
    type: keyof SwitchWidths;
}

interface DisabledProps {
    disabled: boolean;
}

export type SwitchThumbProps = Omit<SwitchThumbStyle, "backgroundColor"> &
    DisabledProps & {
        backgroundColor?: SwitchThumbStyle["backgroundColor"] | Animated.AnimatedInterpolation;
    };
