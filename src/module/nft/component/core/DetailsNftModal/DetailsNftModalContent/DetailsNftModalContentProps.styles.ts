import { Paper } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const DetailsTokenModalCard = styled(Paper, { elevation: 0 })(({ theme: { palette } }) => ({
    justifyContent: "center",
    padding: 24,
    borderRadius: 16,
    backgroundColor: palette.overlay["4%"],
    width: "100%",
}));
