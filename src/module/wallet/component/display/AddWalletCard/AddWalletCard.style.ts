import styled from "@peersyst/react-native-styled";
import { Col, Typography } from "@peersyst/react-native-components";

export const AddText = styled(Typography)(({ theme }) => ({
    color: theme.palette.white,
}));

export const ContentRoot = styled(Col, { justifyContent: "center", alignItems: "center", gap: 20 })(() => ({
    height: "100%",
    width: "100%",
}));
