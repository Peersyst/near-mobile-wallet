import { Paper } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";

export const TokenDetailsCardRoot = styled(Paper, { elevation: 0 })(({ theme: { palette } }) => ({
    justifyContent: "center",
    padding: 24,
    borderRadius: 16,
    backgroundColor: palette.overlay["4%"],
}));

export const TokenDetailsCardButton = styled(Button)(() => ({
    flex: 1,
}));
