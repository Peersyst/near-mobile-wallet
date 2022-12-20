import styled from "@peersyst/react-native-styled";
import { Paper } from "@peersyst/react-native-components";

export const SettingsCardRoot = styled(Paper, { elevation: 0 })(() => ({
    minHeight: 68,
    padding: 20,
    justifyContent: "center",
}));
