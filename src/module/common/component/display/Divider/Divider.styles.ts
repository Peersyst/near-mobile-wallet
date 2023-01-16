import styled from "@peersyst/react-native-styled";
import { Divider } from "@peersyst/react-native-components";

export const DividerRoot = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.overlay["8%"],
    marginVertical: 1,
}));
