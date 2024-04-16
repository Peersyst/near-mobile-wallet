import styled from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";
import { WalletCardButtonRootProps } from "./WalletCardButtons.types";

export const WalletCardButton = styled(Button, { size: "md", variant: "secondary" })<WalletCardButtonRootProps>(({ enableBuy }) => ({
    minWidth: enableBuy ? 70 : 112,
}));
