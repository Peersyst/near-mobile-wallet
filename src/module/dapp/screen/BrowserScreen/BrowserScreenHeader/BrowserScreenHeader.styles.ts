import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";

export const BrowserScreenHeaderRoot = styled(Row)(({ theme }) => ({
    padding: 20,
    columnGap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.overlay["8%"],
}));

export const BrowserScreenHeaderCancelButton = styled(Button, { variant: "text", size: "sm" })(({ theme }) => ({
    sm: { paddingHorizontal: 0 },
    text: { color: theme.palette.primary },
}));
