import styled from "@peersyst/react-native-styled";
import { Text } from "react-native";
import { Row } from "react-native-components";
import { AppearanceProps } from "module/common/types";
import { getTextColor } from "utils/getTextColor";

export const TextRoot = styled(Row, { alignItems: "center", gap: 1 })();

export const TextLogoFont = styled(Text)<AppearanceProps & { fontSize: number }>(({ theme, appearance, fontSize }) => {
    const color = getTextColor(theme);
    return {
        ...color[appearance],
        fontSize: fontSize,
        textTransform: "uppercase",
    };
});
