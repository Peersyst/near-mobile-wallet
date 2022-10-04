import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";

export const SettingsMenuRoot = styled(Row, { justifyContent: "space-between", alignItems: "center" })(({ theme }) => ({
    backgroundColor: theme.palette.background,
    height: 68,
    borderRadius: theme.borderRadius,
    padding: 20,
}));
