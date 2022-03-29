import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

const WALLET_IMAGE_RATIO = 0.25;

export const StyledWalletImage = styled(Image)(({ dimensions: { height } }) => {

    const finalSize = height > 750 ? WALLET_IMAGE_RATIO : WALLET_IMAGE_RATIO / 1.5;
    return {
        width: height * finalSize,
        height: height * finalSize,
        display: height < 650 ? "none" : undefined,
    }
});