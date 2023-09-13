import { PagerView, PagerViewProps } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const ActionsSliderRoot = styled(PagerView)<PagerViewProps>(({ theme, showPageIndicator }) => ({
    pagination: {
        dot: { backgroundColor: theme.palette.overlay["20%"], active: { backgroundColor: theme.palette.primary } },
        paddingTop: showPageIndicator ? 20 : 0,
    },
}));
