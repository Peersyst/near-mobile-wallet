import styled from "@peersyst/react-native-styled";
import { BasePageContent } from "module/common/component/layout/BasePage/BasePageContent/BasePageContent";

export const BaseDAppsScreenRoot = styled(BasePageContent, { watchStatusBar: false })(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: theme.palette.overlay["8%"],
    flex: 1,
}));
