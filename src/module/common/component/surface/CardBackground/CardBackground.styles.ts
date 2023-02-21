import styled from "@peersyst/react-native-styled";
import { ViewStyle } from "react-native";
import { Paper } from "@peersyst/react-native-components";

interface CardBackgroundProps {
    style?: ViewStyle;
}

export const CardBackground = styled(Paper, { elevation: 2 })<CardBackgroundProps>(({ theme }) => ({
    backgroundColor: theme.palette.lighterGray,
}));
