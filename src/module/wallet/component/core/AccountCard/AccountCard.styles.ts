import styled from "@peersyst/react-native-styled";
import { StarIcon } from "icons";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import BaseAccountCard from "module/common/component/surface/BaseAccountCard/BaseAccountCard";
import { Col, Typography } from "react-native-components";
import Balance from "../../display/Balance/Balance";
import { AccountCardRootProps } from "./AccountCard";

export const AccountCardRoot = styled(BaseAccountCard)<AccountCardRootProps>(({ color }) => {
    return {
        paddingBottom: 30,
        backgroundColor: color,
    };
});

export const FavouriteIcon = styled(StarIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 20,
}));

export const CopyIcon = styled(CopyToClipboardIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 20,
}));

export const AccountCardTitle = styled(Typography, { textTransform: "uppercase" })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
}));

export const AccountCardBalance = styled(Balance, { decimals: 6, boldUnits: true, smallBalance: true })(({ theme }) => ({
    color: theme.palette.white,
}));

export const AccountContent = styled(Col, { justifyContent: "space-between" })(() => ({
    height: "100%",
}));
