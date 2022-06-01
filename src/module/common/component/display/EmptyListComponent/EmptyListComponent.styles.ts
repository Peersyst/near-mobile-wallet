import { Typography } from "react-native-components";
import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";

export const EmptyListComponentImage = styled(Image)(({ dimensions: { height } }) => {
    const ASPECT_RATIO = height < 650 ? 0.15 : 0.25;
    return {
        height: height * ASPECT_RATIO,
        width: height * ASPECT_RATIO,
        marginTop: -height * ASPECT_RATIO * 0.1,
    };
});

export const EmptyListComponentText = styled(Typography)(({ theme }) => {
    return {
        color: theme.palette.darkGray2,
    };
});
