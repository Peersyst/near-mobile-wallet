import { Col, Icon } from "@peersyst/react-native-components";
import styled, { styledWithAs } from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import { TransactionIconCompponentProps } from "./TransactionIcon.types";

export const TransactionIconRoot = styled(Col)<TransactionIconCompponentProps>(({ theme: { palette: p }, active }) => ({
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: active ? alpha(p.blue, 0.12) : p.overlay["8%"],
}));

export const TxIcon = styledWithAs(Icon)<TransactionIconCompponentProps>(({ theme: { palette: p }, active }) => ({
    color: active ? p.blue : p.gray["300"],
}));
