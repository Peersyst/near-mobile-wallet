import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";

export const TabGroupRoot = styled(Row, { gap: 20 })(() => ({
    alignItems: "center",
    maxWidth: "100%",
    minWidth: "100%",
}));

export const TabGroupContainer = styled(Row, { gap: 20 })(() => ({
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    overflowX: "scroll",
}));
