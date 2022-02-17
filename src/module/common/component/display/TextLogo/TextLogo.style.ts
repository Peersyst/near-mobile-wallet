import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { LogoIcon } from "icons";
import { Row } from "react-native-components";
import { AppearanceProps } from "module/common/types";
import { getTextColor } from "utils/getTextColor";

export const TextLogoRoot = styled(Row, { alignItems: "center", gap: 8 })<AppearanceProps>();

export const TextLogoIcon = styled(LogoIcon)<AppearanceProps>(({ theme, appearance }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
        fontSize: 37,
    };
});

export const TextRoot = styled(Row, { alignItems: "center", gap: 1 })();

export const TextLogoFont = styled(Text)<AppearanceProps>(({ theme, appearance }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
        fontSize: 23,
        textTransform: "uppercase",
    };
});
