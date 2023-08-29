import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const Filters = styled(Row, { gap: 12 })(({ theme }) => ({
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: theme.palette.overlay["8%"],
    backgroundColor: theme.palette.background,
    padding: 20,
    justifyContent: "center",
}));
