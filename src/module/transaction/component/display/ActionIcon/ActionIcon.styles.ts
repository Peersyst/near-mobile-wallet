import { Col, Icon } from "@peersyst/react-native-components";
import styled, { styledWithAs } from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { ActionIconCompponentProps } from "./ActionIcon.types";

export const ActionIconRoot = styled(Col)<ActionIconCompponentProps>(({ theme: { palette: p }, active }) => ({
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: active ? alpha(p.blue, 0.12) : p.overlay["8%"],
}));

export const TxIcon = styledWithAs(Icon)<ActionIconCompponentProps>(({ theme: { palette: p }, active }) => ({
    color: active ? p.blue : p.gray[300],
}));
