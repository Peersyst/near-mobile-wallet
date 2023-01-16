import { styledWithAs } from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";

export const TotalText = styledWithAs(Typography)(({ theme }) => ({
    color: theme.palette.primary,
}));
