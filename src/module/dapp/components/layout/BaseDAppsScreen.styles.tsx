import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const BaseDAppsScreenRoot = styled(Col, { flex: 1 })(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: theme.palette.overlay["8%"],
}));
