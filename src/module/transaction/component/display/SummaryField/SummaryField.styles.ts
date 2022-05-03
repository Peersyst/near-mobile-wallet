import { styledWithAs } from "@peersyst/react-native-styled";
import { Typography } from "react-native-components";

export const SummaryText = styledWithAs(Typography)(({ theme }) => ({
    color: theme.palette.darkGray,
}));
