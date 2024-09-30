import { Col, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { SearchIcon } from "icons";

export const DAppsScreenHeaderWrapper = styled(Col)(({ theme }) => ({
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    rowGap: 10,
    backgroundColor: theme.palette.background,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
}));

export const DAppsScreenFakeInput = styled(Row)(({ theme }) => ({
    backgroundColor: theme.palette.overlay["4%"],
    borderRadius: theme.borderRadiusMd,
    borderWidth: 0,
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 12,
    columnGap: 10,
}));

export const DAppsScreenFakeInputIcon = styled(SearchIcon)(({ theme }) => ({
    color: theme.palette.overlay["20%"],
    fontSize: 20,
}));
