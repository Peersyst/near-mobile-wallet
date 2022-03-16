import styled from "@peersyst/react-native-styled";
import { ViewStyle } from "react-native";
import { Paper } from "react-native-components";

interface CardBackgroundProps {
    style?: ViewStyle;
}

export const CardBackground = styled(Paper, { elevation: 2 })<CardBackgroundProps>(({ theme }) => ({
    backgroundColor: theme.palette.lighterGray,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowOffset: {
        height: -2,
        width: 0,
    },
    shadowRadius: 6,
}));
