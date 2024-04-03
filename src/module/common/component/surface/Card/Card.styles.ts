import { Paper } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { CardProps } from "./Card";
import { alpha } from "@peersyst/react-utils";

export const CardRoot = styled(Paper, { elevation: 0 })<CardProps>(({ theme: { palette }, variant }) => ({
    justifyContent: "center",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    ...(variant === "gray" && {
        backgroundColor: palette.overlay["4%"],
    }),
    ...(variant === "blue" && {
        backgroundColor: alpha(palette.blue, 0.12),
    }),
}));
