import styled from "@peersyst/react-native-styled";
import { Paper, Typography, Image } from "@peersyst/react-native-components";

export const SimpleNewsCardRoot = styled(Paper)(({ theme, dimensions }) => ({
    padding: dimensions.width * 0.04,
    borderRadius: theme.borderRadiusSm,
}));

export const NewsImage = styled(Image)(({ theme, dimensions }) => ({
    width: "100%",
    height: dimensions.width * 0.35,
    backgroundColor: theme.palette.gray[100],
    borderRadius: theme.borderRadiusXs,
}));

export const NewTitle = styled(Typography, { numberOfLines: 2 })(({ theme }) => ({
    color: theme.palette.gray[600],
}));

export const NewDate = styled(Typography)(({ theme }) => ({
    color: theme.palette.gray[300],
}));
