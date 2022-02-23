import styled from "@peersyst/react-native-styled";
import { LogoIcon } from "icons";
import { getTextColor } from "utils/getTextColor";
import { IsotipProps, SizeIsotipRelationType } from "./Isotip.types";

export const Isotip = styled(LogoIcon)<IsotipProps>(({ theme, appearance, size }) => {
    const color = getTextColor(theme, appearance);
    const { fontSize } = sizeRelations[size];
    return {
        color,
        fontSize: fontSize,
    };
});

export const sizeRelations: SizeIsotipRelationType = {
    sm: {
        fontSize: 37.72,
    },
    md: {
        fontSize: 70,
    },
    lg: {
        fontSize: 103.61,
    },
    xl: {
        fontSize: 165.43,
    },
};
