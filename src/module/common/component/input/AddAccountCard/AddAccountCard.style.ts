import styled from "@peersyst/react-native-styled";
import { PlusIcon } from "icons";
import { Row, Typography } from "react-native-components";
import { AccountCardRoot } from "../../surface/AccountCard/AccountCard.styles";

export const AddIcon = styled(PlusIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 64,
}));

export const AddText = styled(Typography, { textTransform: "uppercase" })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
}));

export const AddAccountCardRoot = styled(AccountCardRoot)(({ theme }) => ({
    backgroundColor: theme.palette.darkLightGray,
}));

export const ContentRoot = styled(Row, { justifyContent: "center", alignItems: "center", gap: 20 })(() => ({
    height: "100%",
}));
