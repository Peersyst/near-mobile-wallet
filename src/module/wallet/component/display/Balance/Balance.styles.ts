import styled from "@peersyst/react-native-styled";
import isHeading from "module/common/component/base/display/Typography/utils/isHeading";
import { Typography } from "react-native-components";
import { BalanceItemProps } from "./Balance.types";

export const BalanceItem = styled(Typography, { textTransform: "uppercase" })<BalanceItemProps>(({ theme, smallBalance, variant }) => {
    const { fontSize, lineHeight } = theme.typography[variant];
    const heading = isHeading(variant);
    return {
        marginBottom: smallBalance ? (heading ? 2 : 1) : undefined,
        fontSize: smallBalance && fontSize ? fontSize * 0.7 : fontSize,
        lineHeight: smallBalance && lineHeight ? lineHeight * 0.7 : lineHeight,
    };
});
