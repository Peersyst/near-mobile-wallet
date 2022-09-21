import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";

export const BottomBarRoot = styled(Row, { justifyContent: "space-around", alignItems: "center" })(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 32,
    height: 64,
}));
