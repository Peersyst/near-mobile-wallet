import { PagerView } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ActionsSliderRoot = styled(PagerView)(({ theme }) => ({
    pagination: { dot: { backgroundColor: theme.palette.overlay["20%"], active: { backgroundColor: theme.palette.primary } } },
}));
