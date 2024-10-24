import { CircularProgressStyle, ThemeColor } from "@peersyst/react-native-components";

export type LoadingLogoProps = {
    color?: ThemeColor;
    style?: CircularProgressStyle;
};

export type LoadingLogoRootProps = {
    color: string;
    size: number;
};

export type LoadingLogoIconProps = LoadingLogoRootProps;
