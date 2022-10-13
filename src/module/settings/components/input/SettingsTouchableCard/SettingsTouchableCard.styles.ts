import styled from "@peersyst/react-native-styled";
import { TouchableHighlight } from "react-native";

export const SettingsTouchableCardRoot = styled(TouchableHighlight, { activeOpacity: 0.93 })(({ theme: { borderRadius } }) => ({
    borderRadius: borderRadius + 1,
}));
