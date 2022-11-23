import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";

export const DAOBalanceRowRoot = styled(Row, { justifyContent: "space-between", alignItems: "baseline" })(({ dimensions: { height } }) => ({
    height: Math.min(height * 0.035, 26),
}));
