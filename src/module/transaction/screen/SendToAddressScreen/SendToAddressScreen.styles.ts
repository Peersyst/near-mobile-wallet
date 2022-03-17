import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

const SEND_IMAGE_RATIO = 0.6;

export const SendImage = styled(Image)(({ dimensions: { width, height } }) => ({
    width: width * SEND_IMAGE_RATIO,
    height: width * SEND_IMAGE_RATIO,
    display: height < 680 ? "none" : undefined,
}));
