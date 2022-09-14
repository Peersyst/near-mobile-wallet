import styled from "@peersyst/react-native-styled";
import { Modal } from "@peersyst/react-native-components";

export const TransactionDetailsModalRoot = styled(Modal)(() => ({
    position: "absolute",
    bottom: 0,
    maxWidth: "100%",
    width: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 40,
}));
