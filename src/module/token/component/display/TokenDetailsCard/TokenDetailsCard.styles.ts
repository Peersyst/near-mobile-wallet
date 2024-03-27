import styled from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";
import Card from "module/common/component/surface/Card/Card";

export const TokenDetailsCardRoot = styled(Card)(() => ({
    gap: 16,
    textAlign: "center",
}));

export const TokenDetailsCardButton = styled(Button)(() => ({
    flex: 1,
}));
