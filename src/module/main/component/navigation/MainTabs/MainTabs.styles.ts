import styled from "@peersyst/react-native-styled";
import { Paper, TabGroup as BaseTabGroup } from "@peersyst/react-native-components";

export const MainTabsRoot = styled(Paper)(() => ({
    flex: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}));

export const TabGroup = styled(BaseTabGroup)(({ theme }) => ({
    borderBottomWidth: 1,
    borderColor: theme.palette.overlay["8%"],
    justifyContent: "center",
}));
