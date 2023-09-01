import styled from "@peersyst/react-native-styled";
import { CircleCheckIcon, CircleErrorIcon, CircleWarningIcon } from "icons";

export const AllowedIcon = styled(CircleCheckIcon)(({ theme }) => ({
    color: theme.palette.primary,
    fontSize: 28,
}));

export const ForbiddenIcon = styled(CircleErrorIcon)(({ theme }) => ({
    color: theme.palette.gray[300],
    fontSize: 28,
}));

export const CriticalIcon = styled(CircleWarningIcon)(({ theme }) => ({
    color: theme.palette.status.error,
    fontSize: 28,
}));
