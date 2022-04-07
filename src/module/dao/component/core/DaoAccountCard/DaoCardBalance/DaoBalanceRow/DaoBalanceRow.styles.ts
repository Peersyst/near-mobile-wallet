import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";

export const DaoBalanceRowRoot = styled(Row, { justifyContent: "space-between", alignItems: "center" })(({ dimensions: { height } }) => ({
    height: Math.min(height * 0.035, 26),
}));
