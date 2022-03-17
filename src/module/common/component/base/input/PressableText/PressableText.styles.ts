import styled from "@peersyst/react-native-styled";
import { Typography } from "../../display/Typography";

export const TouchableText = styled(Typography)<{ pressed: boolean }>(({ pressed }) => ({
    opacity: pressed ? 0.6 : 1,
}));
