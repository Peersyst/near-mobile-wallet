import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { RefreshIcon } from "icons";

export const SearchHistoryItemRoot = styled(Row)(({ theme }) => ({
    alignItems: "center",
    columnGap: 4,
    width: "100%",
}));

export const SearchHistoryItemIcon = styled(RefreshIcon)(({ theme }) => ({
    color: theme.palette.overlay["40%"],
    ...theme.typography.body3Light,
}));
