import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";

export const SearchHistoryRoot = styled(Col)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 20,
    paddingVertical: 12,
}));

export const EmptyHistory = styled(EmptyListComponent)(() => ({
    paddingVertical: 20,
}));
