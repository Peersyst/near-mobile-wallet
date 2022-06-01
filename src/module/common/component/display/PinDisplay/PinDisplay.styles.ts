import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";
import { Text } from "react-native";

export const PinDisplayRoot = styled(Row, { gap: 14, alignItems: "center" })(() => ({ height: 20 }));

export const PinDisplayPlaceholder = styled(Text)(({ theme }) => ({
    color: theme.palette.text,
    opacity: 0.8,
    fontSize: 16,
}));
