import styled from "@peersyst/react-native-styled";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import { Col, Typography } from "react-native-components";
import Balance from "../../display/Balance/Balance";
import BaseWalletCard from "module/common/component/surface/BaseWalletCard/BaseWalletCard";
import { WalletCardRootProps } from "module/wallet/component/core/WalletCard/WalletCard";
import { EditWalletIcon } from "./WalletCardHeader/EditWalletIcon/EditWalletIcon";

export const WalletCardRoot = styled(BaseWalletCard)<WalletCardRootProps>(({ color }) => {
    return {
        paddingBottom: 30,
        backgroundColor: color,
    };
});

export const EditIcon = styled(EditWalletIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 20,
}));

export const CopyIcon = styled(CopyToClipboardIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 20,
}));

export const WalletCardTitle = styled(Typography, { textTransform: "uppercase", numberOfLines: 1 })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
    maxWidth: "70%",
    textAlign: "center",
}));

export const WalletCardBalance = styled(Balance, { decimals: 6, boldUnits: true, smallBalance: true })(({ theme }) => ({
    color: theme.palette.white,
}));

export const WalletContent = styled(Col, { justifyContent: "space-between" })(() => ({
    height: "100%",
}));
