import styled from "@peersyst/react-native-styled";
import { Toolbar } from "@peersyst/react-native-components";

export const TOOLBAR_HEIGHT = 56;

export const ToolbarRoot = styled(Toolbar)(() => ({ alignItems: "flex-end", height: TOOLBAR_HEIGHT }));
