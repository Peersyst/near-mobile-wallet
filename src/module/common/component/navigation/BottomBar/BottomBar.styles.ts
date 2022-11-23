import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";

export const BottomBarRoot = styled(Row, { justifyContent: "space-around", alignItems: "center" })(({ theme, safeAreaInsets }) => ({
    backgroundColor: theme.palette.background,
    borderTopWidth: 1,
    borderTopColor: theme.palette.overlay["8%"],
    paddingHorizontal: 32,
    paddingBottom: safeAreaInsets.bottom + 10,
    paddingTop: 13,
}));
