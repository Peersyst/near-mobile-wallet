import { Paper } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { CardProps } from "./Card";

export const CardRoot = styled(Paper, { elevation: 0 })<CardProps>(({ theme: { palette }, variant = "gray" }) => ({
    justifyContent: "center",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    ...(variant === "gray" && {
        backgroundColor: palette.overlay["4%"],
    }),
}));
