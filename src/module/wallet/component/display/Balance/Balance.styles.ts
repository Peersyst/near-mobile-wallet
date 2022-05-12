import styled from "@peersyst/react-native-styled";
import { Typography } from "react-native-components";
import { BalanceItemProps } from "./Balance.types";

export const BalanceItem = styled(Typography, { textTransform: "uppercase" })<BalanceItemProps>(({ theme, smallBalance, variant }) => {
    const { fontSize, lineHeight } = theme.typography[variant];
    return {
        fontSize: smallBalance && fontSize ? fontSize * 0.7 : fontSize,
        lineHeight: smallBalance && lineHeight ? lineHeight * 0.7 : lineHeight,
    };
});
