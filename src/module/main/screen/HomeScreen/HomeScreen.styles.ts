import styled from "@peersyst/react-native-styled";
import CardBackground from "module/common/component/surface/CardBackground/CardBackground";

export const CardBackgroundHome = styled(CardBackground, { elevation: 2 })(() => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "90%",
    elevation: -1,
    zIndex: -1,
}));
