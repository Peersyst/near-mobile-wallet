import styled from "@peersyst/react-native-styled";
import { StarIcon } from "icons";
import CopyToClipboardIcon from "module/common/component/base/input/CopyToClipboardIcon/CopyToClipboardIcon";
import BaseAccountCard from "module/common/component/surface/BaseAccountCard/BaseAccountCard";
import { Typography } from "react-native-components";

export const AccountCardRoot = styled(BaseAccountCard)(({ theme }) => ({
    backgroundColor: theme.palette.purple,
}))

export const FavouriteIcon = styled(StarIcon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 23,
}))

export const CopyIcon = styled(CopyToClipboardIcon)(({ theme })=>({
    color: "white",
    fontSize: 23,
}))

export const AccountCardTitle = styled(Typography)(({ theme })=>({
    color: theme.palette.white,
    fontWeight: "bold",
}))