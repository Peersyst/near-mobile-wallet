import { ScaleTransform, ButtonProps as NativeButtonProps } from "react-native";

export interface RippleAnimCircleProps {
    scaleStart?: ScaleTransform["scale"];
    size?: number;
    zIndex?: number;
    color1?: string;
    color2?: string;
    duration?: number;
    onPress: (ev: any) => void;
}

export interface RippleColor extends Pick<RippleAnimCircleProps, "size">{
    color?: string;
};