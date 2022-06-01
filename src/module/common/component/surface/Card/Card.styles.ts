import styled from "@peersyst/react-native-styled";
import { Paper } from "react-native-components";

export const CardRoot = styled(Paper, { elevation: 8 })(({ theme }) => ({
    padding: 20,
    backgroundColor: theme.palette.lighterGray,
}));
