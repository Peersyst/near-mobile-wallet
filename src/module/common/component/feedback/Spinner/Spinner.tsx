import { Theme, useTheme } from "@peersyst/react-native-components";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export interface SpinnerProps extends Omit<ActivityIndicatorProps, "color"> {
    color?: (theme: Theme["palette"]) => string;
}

const Spinner = ({ color: colorCb, style, ...rest }: SpinnerProps): JSX.Element => {
    const { palette } = useTheme();
    const color = colorCb?.(palette) || palette.text;
    return <ActivityIndicator style={style} color={color} {...rest} />;
};

export default Spinner;
