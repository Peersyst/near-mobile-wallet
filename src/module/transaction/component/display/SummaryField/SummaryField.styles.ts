import styled from "@peersyst/react-native-styled";
import { Label } from "@peersyst/react-native-components";

export const SummaryFieldRoot = styled(Label, { gap: 4 })(({ theme }) => ({
    label: {
        color: theme.palette.gray[300],
    },
}));
