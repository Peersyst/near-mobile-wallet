import styled from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";
import Card from "module/common/component/surface/Card/Card";

export const YouDontHaveNearCardCardRoot = styled(Card)(() => ({
    gap: 10,
    textAlign: "center",
}));

export const DescriptionTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.overlay["60%"],
    textAlign: "center",
}));
