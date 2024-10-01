import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { RefreshIcon } from "icons";
import Button from "module/common/component/input/Button/Button";

export const SearchHistoryItemCont = styled(Row)(() => ({
    alignItems: "center",
    columnGap: 4,
    width: "100%",
}));

export const SearchHistoryItemIcon = styled(RefreshIcon)(({ theme }) => ({
    color: theme.palette.overlay["40%"],
    ...theme.typography.body3Light,
}));

export const SearchHistoryItemRoot = styled(Button)(() => ({
    lg: { paddingHorizontal: 0 },
}));
