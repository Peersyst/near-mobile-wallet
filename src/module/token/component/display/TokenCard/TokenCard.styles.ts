import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";

export const TokenIcon = styled(Image)(() => ({
    width: 44,
    height: 44,
    borderRadius: 50,
}));

export const TokenRoot = styled(MainListCard, { alignItems: "center", justifyContent: "space-between" })(() => ({
    paddingVertical: 14,
}));
