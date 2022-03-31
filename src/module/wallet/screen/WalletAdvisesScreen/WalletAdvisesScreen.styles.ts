import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

const ADVISE_IMAGE_RATIO = 0.35;

export const AdviseImage = styled(Image)(({ dimensions: { width, height } }) => ({
    width: width * ADVISE_IMAGE_RATIO,
    height: width * ADVISE_IMAGE_RATIO,
    display: height < 680 ? "none" : undefined,
}));
