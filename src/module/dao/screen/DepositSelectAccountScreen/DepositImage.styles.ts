import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

export const DepositImage = styled(Image)(({ dimensions: { height } }) => {
    const ASPECT_RATIO = height < 800 ? 0.3 : 0.4;
    return {
        height: height * ASPECT_RATIO,
        width: height * ASPECT_RATIO,
        marginTop: -height * ASPECT_RATIO * 0.1,
    };
});
