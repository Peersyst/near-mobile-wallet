import styled from "@peersyst/react-native-styled";
import { Row } from "module/common/component/base";

export const TOOLBAR_HEIGHT = 56;

export const ToolbarRoot = styled(Row)(() => ({
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    height: TOOLBAR_HEIGHT,
}));
