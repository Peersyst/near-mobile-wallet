import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";

export const BaseMainScreenRoot = styled(Col, { flex: 1 })(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
}));
