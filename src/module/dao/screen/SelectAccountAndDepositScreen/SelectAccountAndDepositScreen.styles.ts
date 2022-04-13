import styled from "@peersyst/react-native-styled";
import { Paper, Typography } from "react-native-components";

export const WithdrawSelectorCard = styled(Paper, { elevation: 8 })(() => ({
    padding: 20,
}));

export const ErrorMessageText = styled(Typography)(({ theme }) => ({
    color: theme.palette.red,
}));
