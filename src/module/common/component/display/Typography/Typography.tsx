import { TypographyProps as BaseTypographyProps, Typography as BaseTypography, Theme, useTheme } from "@peersyst/react-native-components";

export interface TypographyProps extends BaseTypographyProps {
    color?: (theme: Theme["palette"]) => string;
}

const Typography = ({ color: colorCb, style, ...rest }: TypographyProps): JSX.Element => {
    const { palette } = useTheme();

    const color = colorCb?.(palette);

    return <BaseTypography style={{ ...(color && { color }), ...style }} {...rest} />;
};

export default Typography;
