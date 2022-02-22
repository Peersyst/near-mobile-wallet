import styled from "@peersyst/react-native-styled";
import { getTextColor } from "utils/getTextColor";
import { TextLogoIcon as Icon } from "asset/image/HorizontalLogo/TextLogoIcon";
import { LogotipProps } from "./Logotip";

export const TextLogoSizeRelations = {
    sm: {
        width: 104,
        height: 17,
    },
    md: {
        width: 134,
        height: 21
    },
    lg: {
        width: 165,
        height: 26
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
