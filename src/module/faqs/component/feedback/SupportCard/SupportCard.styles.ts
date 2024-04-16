import styled from "@peersyst/react-native-styled";
import { Image } from "@peersyst/react-native-components";
import Card from "module/common/component/surface/Card/Card";

export const SupportImage = styled(Image)(() => ({
    width: 124,
    height: 70,
}));

export const SupportCardRoot = styled(Card)(() => ({
    alignItems: "center",
    marginTop: 20,
}));
