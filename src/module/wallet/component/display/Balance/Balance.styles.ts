import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { BalanceRootProps } from "./Balance.types";

export const BalanceRoot = styled(View)<BalanceRootProps>(({ theme, variant }) => {
    const typography = theme.typography;
    const variantStyle = typography[variant] || {};
    return {
        minHeight: variantStyle.lineHeight || (variantStyle?.fontSize ? variantStyle?.fontSize * 1.5 : undefined),
    };
});
