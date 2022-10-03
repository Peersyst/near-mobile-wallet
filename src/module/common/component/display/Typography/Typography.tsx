import { TypographyProps as BaseTypographyProps, Typography as BaseTypography, Theme, useTheme } from "@peersyst/react-native-components";

export interface TypographyProps extends BaseTypographyProps {
    color?: (theme: Theme["palette"]) => string;
}

const Typography = ({ color: colorCb, light, style, ...rest }: TypographyProps): JSX.Element => {
    const { palette } = useTheme();

    const color = colorCb?.(palette) || palette.gray[light ? 300 : 600];

    return <BaseTypography style={{ color, ...style }} {...rest} />;
};

export default Typography;
