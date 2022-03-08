import styled from "@peersyst/react-native-styled";
import { StarIcon } from "icons";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import BaseAccountCard from "module/common/component/surface/BaseAccountCard/BaseAccountCard";
import { Typography } from "react-native-components";
import { AccountCardProps } from "./AccountCard";
import { getCardColor } from "./utils/getCardColors";

export const AccountCardRoot = styled(BaseAccountCard)<Pick<AccountCardProps, "colorIndex">>(({ theme, colorIndex }) => {
    const color = getCardColor(colorIndex, theme);
    return {
        backgroundColor: color,
    }
})

export const FavouriteIcon = styled(StarIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 23,
}))

export const CopyIcon = styled(CopyToClipboardIcon)(({ theme }) => ({
    color: "white",
    fontSize: 23,
}))

export const AccountCardTitle = styled(Typography, { textTransform: "uppercase" })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
}))

export const BalanceInteger = styled(Typography)(({ theme }) => ({
    color: theme.palette.white,
}))

export const TokenText = styled(Typography, { textTransform: "uppercase" })(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
}))