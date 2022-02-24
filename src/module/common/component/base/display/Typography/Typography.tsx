import { TypographyProps } from "module/common/component/base/display/Typography/Typography.types";
import { useTheme } from "@peersyst/react-native-styled";
import { TypographyRoot } from "./Typography.styles";

const Typography = ({ variant, children, ...rest }: TypographyProps): JSX.Element => {
    const { typography } = useTheme();
    const variantStyle = typography[variant];

    return (
        <TypographyRoot variantStyles={variantStyle} {...rest}>
            {children}
        </TypographyRoot>
    );
};

export default Typography;
