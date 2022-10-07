import styled from "@peersyst/react-native-styled";
import { Paper, Typography, Image } from "@peersyst/react-native-components";

export const SimpleNewsCardRoot = styled(Paper)(({ dimensions }) => ({
    padding: dimensions.width * 0.04,
    // minHeight: 120,
    borderRadius: 6,
}));

export const NewsImage = styled(Image)(({ theme, dimensions }) => ({
    width: "100%",
    height: dimensions.width * 0.4,
    backgroundColor: theme.palette.lightGray,
    borderRadius: 4,
}));

export const NewTitle = styled(Typography, { numberOfLines: 2 })(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.darkGray,
}));

export const NewDate = styled(Typography)(({ theme }) => ({
    color: theme.palette.gray[300],
}));
