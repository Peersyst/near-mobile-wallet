import styled from "@peersyst/react-native-styled";
import { Typography } from "../../display/Typography";
import { TouchableTextProps } from "module/common/component/base";

export const TouchableText = styled(Typography)<TouchableTextProps>(({ pressed, disabled, theme }) => ({
    opacity: pressed ? 0.6 : 1,
    color: disabled ? theme.palette.disabled : theme.palette.text,
}));
