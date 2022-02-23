import styled from "@peersyst/react-native-styled";
import { getTextColor } from "utils/getTextColor";
import { TextLogoIcon as Icon } from "asset/image/HorizontalLogo/TextLogoIcon";
import { LogotipProps } from "./Logotip";
import { SizeType } from "module/common/types";

export const TextLogoSizeRelations: Record<SizeType, { width: number, height: number }> = {
    sm: {
        width: 103.62,
        height: 16.27,
    },
    md: {
        width: 133.62,
        height: 20.99
    },
    lg: {
        width: 165.42,
        height: 25.99
    }
}

export const Logotip = styled(Icon)<LogotipProps>(({ theme, appearance, size }) => {
    const color = getTextColor(theme);
    const { width, height } = TextLogoSizeRelations[size];
    
    return {
        ...color[appearance],
        width,
        height,
    };
});
