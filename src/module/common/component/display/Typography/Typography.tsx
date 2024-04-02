import { TypographyProps as BaseTypographyProps, Typography as BaseTypography } from "@peersyst/react-native-components";

export interface TypographyProps extends Omit<BaseTypographyProps, "fontWeight"> {}

const Typography = (props: TypographyProps): JSX.Element => {
    return <BaseTypography {...props} />;
};

export default Typography;
