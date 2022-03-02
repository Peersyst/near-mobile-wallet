import styled from "@peersyst/react-native-styled";
import { Row } from "../../base/layout/Row";

export const BottomBarRoot = styled(Row, {justifyContent:"space-around", alignItems: "center"})(({ theme }) => ({
    ...theme.shadows[8],
    backgroundColor: "#f9f9f9",
    height: 83,
    borderTopWidth:1.2,
    borderTopColor: "rgba(0,0,0,0.05)"
}));
