import styled from "@peersyst/react-native-styled";
import { alpha } from "@peersyst/react-utils";
import Typography from "module/common/component/display/Typography/Typography";
import Card from "module/common/component/surface/Card/Card";

export const YouDontHaveNearCardCardRoot = styled(Card)(() => ({
    gap: 10,
    textAlign: "center",
}));

export const DescriptionTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.text : alpha(theme.palette.overlay["12%"], 0.6),
    textAlign: "center",
}));
