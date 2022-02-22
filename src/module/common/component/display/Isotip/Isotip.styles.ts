import styled from "@peersyst/react-native-styled";
import { LogoIcon } from "icons";
import { getTextColor } from "utils/getTextColor";
import { IsotipProps, SizeIsotipRelationType } from "./Isotip.types";

export const Isotip = styled(LogoIcon)<IsotipProps>(({ theme, appearance, size }) => {
    const color = getTextColor(theme);
    const { fontSize } = sizeRelations[size];
    return {
        ...color[appearance],
        fontSize: fontSize,
    };
});

export const sizeRelations: SizeIsotipRelationType = {
    sm: {
        fontSize: 38,
    },
    md: {
        fontSize: 70,
    },
    lg: {
        fontSize: 104,
    },
    xl: {
        fontSize: 166,
    },
};
