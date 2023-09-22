import styled from "@peersyst/react-native-styled";
import Typography from "../Typography/Typography";
import { CircleErrorIcon } from "icons";

export const ErrorIcon = styled(CircleErrorIcon)(({ theme }) => ({
    color: theme.palette.status.error,
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.gray[300],
}));
