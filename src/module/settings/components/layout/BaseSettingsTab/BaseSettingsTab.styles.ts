import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const BaseSettingsTabRoot = styled(Col)(({ safeAreaInsets }) => ({
    paddingBottom: safeAreaInsets.bottom + 25,
}));
