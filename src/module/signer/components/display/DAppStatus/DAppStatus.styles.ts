import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { DAppStatusProps } from "./DappStatus.types";

export const DAppStatusRoot = styled(Row)<{ connected: DAppStatusProps }>(({ theme, connected = false }) => ({
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 28,
    backgroundColor: connected ? alpha(theme.palette.green, 0.12) : alpha(theme.palette.gray[600], 0.12),
}));
