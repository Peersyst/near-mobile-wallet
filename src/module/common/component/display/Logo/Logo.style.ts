import styled from "@peersyst/react-native-styled";
import { LogoIcon } from "icons";
import { AppearanceProps } from "module/common/types";
import { getTextColor } from "utils/getTextColor";

export const LogoRoot = styled(LogoIcon)<AppearanceProps & { fontSize: number }>(({ theme, appearance, fontSize }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
        fontSize: fontSize,
    };
});
