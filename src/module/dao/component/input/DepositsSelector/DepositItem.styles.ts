import { Typography } from "@peersyst/react-native-components";
import { styledWithAs } from "@peersyst/react-native-styled";
import { DepositItemTextProps, getDepositItemTextColorParams } from "./DepositItem";

const getDepositItemTextColor = ({ theme, type, unlockable }: getDepositItemTextColorParams) => {
    if (type === "deposit") return theme.palette.black;
    return unlockable ? theme.palette.status.success : theme.palette.status.warning;
};

export const DepositItemText = styledWithAs(Typography)<DepositItemTextProps>((props) => {
    const finalColor = getDepositItemTextColor(props);
    return {
        color: finalColor,
    };
});
