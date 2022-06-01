import styled from "@peersyst/react-native-styled";
import { Typography, Image } from "react-native-components";

export const BigNewsImage = styled(Image)(({ theme, dimensions }) => ({
    width: "100%",
    height: dimensions.width * 0.3,
    backgroundColor: theme.palette.lightGray,
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: theme.palette.gray,
}));

export const BigNewsDate = styled(Typography)(({ theme }) => ({
    color: theme.palette.darkGray,
}));
