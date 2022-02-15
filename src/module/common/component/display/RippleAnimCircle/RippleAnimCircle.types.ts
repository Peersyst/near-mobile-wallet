import { ViewStyle, ScaleTransform } from "react-native"

export interface RippleAnimCircleProps {
    scaleStart?: ScaleTransform;
    styles?: ViewStyle;
    size?: number;
    zIndex?: number;
    color1?: string;
    color2?: string;
    duration?: number;
}

export interface RippleColor extends Pick<RippleAnimCircleProps, "size">{
    color?: string;
};