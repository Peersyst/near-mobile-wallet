import { SvgProps } from "react-native-svg";

export type LinearLogoSize = "sm" | "md";

export interface LinearBgLogoProps extends SvgProps {
    size?: LinearLogoSize;
    startColor: string;
    endColor: string;
}
