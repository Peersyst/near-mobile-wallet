import styled from "@peersyst/react-native-styled";
import { Col, Typography } from "@peersyst/react-native-components";

export const WalletCardTitle = styled(Typography, { textTransform: "uppercase", numberOfLines: 1 })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
    maxWidth: "70%",
    textAlign: "center",
}));

export const WalletContent = styled(Col, { justifyContent: "space-between" })(() => ({
    height: "100%",
}));
