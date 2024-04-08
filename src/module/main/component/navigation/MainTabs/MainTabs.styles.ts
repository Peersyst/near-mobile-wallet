import styled from "@peersyst/react-native-styled";
import { TabGroup as BaseTabGroup } from "@peersyst/react-native-components";

export const TabGroup = styled(BaseTabGroup)(({ theme }) => ({
    borderBottomWidth: 1,
    borderColor: theme.palette.overlay["8%"],
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
}));
