import styled from "@peersyst/react-native-styled";
import { Row } from "module/common/component/base";

export const ToolbarRoot = styled(Row)(({ theme }) => ({
    position: "relative",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    height: theme.toolbarHeight,
}));
