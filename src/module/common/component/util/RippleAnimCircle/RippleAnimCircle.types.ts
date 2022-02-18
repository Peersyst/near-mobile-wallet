import { ScaleTransform, NativeSyntheticEvent, NativeTouchEvent } from "react-native";

export interface RippleAnimCircleProps {
    scaleStart?: ScaleTransform["scale"];
    size?: number;
    zIndex?: number;
    color1?: string;
    color2?: string;
    duration?: number;
    onPress?: (param?: any, ev?: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export interface RippleColor extends Pick<RippleAnimCircleProps, "size"> {
    color?: string;
};