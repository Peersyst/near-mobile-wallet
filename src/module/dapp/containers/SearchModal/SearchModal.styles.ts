import { Backdrop, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";

export const SearchBarModalRoot = styled(Backdrop)(({ theme, safeAreaInsets }) => ({
    backgroundColor: theme.palette.gray[100],
    paddingTop: safeAreaInsets.top,
}));

export const SearchBarModalWrapper = styled(Row)(({ theme }) => ({
    padding: 20,
    width: "100%",
    alignItems: "center",
    columnGap: 10,
    backgroundColor: theme.palette.background,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
}));

export const SearchModalButton = styled(Button, { variant: "text", size: "sm" })(({ theme }) => ({
    sm: { paddingHorizontal: 0 },
    text: { color: theme.palette.primary },
}));
