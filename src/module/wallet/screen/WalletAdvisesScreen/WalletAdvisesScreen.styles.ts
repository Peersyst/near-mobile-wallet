import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";
import { Row } from "react-native-components";

const ADVISE_IMAGE_RATIO = 0.35;

export const AdviseImage = styled(Image, { fadeDuration: 400 })(({ dimensions: { width } }) => ({
    width: width * ADVISE_IMAGE_RATIO,
    height: width * ADVISE_IMAGE_RATIO,
}));

export const AdviseImageCont = styled(Row, { justifyContent: "center" })(({ dimensions: { height } }) => {
    console.log(height);
    return {
        display: height < 800 ? "none" : undefined,
    };
});
