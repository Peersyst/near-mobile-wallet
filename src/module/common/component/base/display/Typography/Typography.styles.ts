import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { TypographyStyleProps } from "module/common/component/base/display/Typography/Typography.types";

export const TypographyRoot = styled(Text)<TypographyStyleProps>(
    ({ textTransform, textAlign, fontStyle, fontWeight, light, font, variantStyles, theme }) => ({
        ...variantStyles,
        textTransform,
        textAlign,
        fontStyle,
        fontWeight,
        opacity: light ? 0.7 : 1,
        fontFamily: font && theme.fonts?.[font],
    }),
);
