import styled from "@peersyst/react-native-styled";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import { Col, Typography } from "@peersyst/react-native-components";

export const CopyIcon = styled(CopyToClipboardIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 20,
}));

export const WalletCardTitle = styled(Typography, { textTransform: "uppercase", numberOfLines: 1 })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
    maxWidth: "70%",
    textAlign: "center",
}));

export const WalletContent = styled(Col, { justifyContent: "space-between" })(() => ({
    height: "100%",
}));
