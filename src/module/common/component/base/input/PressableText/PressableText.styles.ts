import styled from "@peersyst/react-native-styled";
import { TouchableTextProps } from "module/auth/screen/AuthSwitchPage/AuthSwitchPage";
import { Typography } from "../../display/Typography";

export const TouchableText = styled(Typography)<TouchableTextProps>(({ pressed }) => ({
    textDecorationLine: pressed ? "underline" : undefined,
}));
