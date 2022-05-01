import { Typography } from "react-native-components";
import { styledWithAs } from "@peersyst/react-native-styled";
import { DepositItemTextProps } from "./DepositItem";

export const DepositItemText = styledWithAs(Typography)<DepositItemTextProps>(({ theme, unlockable, selected }) => {
    return {
        color: selected ? theme.palette.white : unlockable ? theme.palette.status.success : theme.palette.status.warning,
    };
});
