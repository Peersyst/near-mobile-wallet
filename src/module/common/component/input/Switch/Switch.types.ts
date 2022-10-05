import { ReactElement } from "react";
import { Animated, LayoutChangeEvent, ViewStyle } from "react-native";

export interface SwitchProps {
    /**
     * Switch styles
     */
    style?: SwitchStyle;

    /**
     * Animation options
     */
    animationConfig?: Omit<Parameters<typeof Animated.timing>[1], "toValue">;
    /**
     * Left component
     */
    LeftComponent?: ReactElement;
    /**
     * Right component
     */
    RightComponent?: ReactElement;
}

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
    backgroundColor?: ViewStyle["backgroundColor"];
}

export interface SwitchTrackStyle {
    /**
     * Background color of the track
     */
    backgroundColor?: ViewStyle["backgroundColor"];
}

export interface SwitchStyle {
    /**
     * Switch thumb styles
     */
    thumb?: SwitchThumbStyle;
    /**
     * Switch track styles
     * @default { backgroundColor: theme.palette.primary }
     */
    track?: SwitchTrackStyle;
}

export interface SwitchWidths {
    trackWidth: 0;
    wrapperWidth: 0;
}

export interface HandleLayoutParams {
    nativeEvent: LayoutChangeEvent["nativeEvent"];
    type: keyof SwitchWidths;
}
