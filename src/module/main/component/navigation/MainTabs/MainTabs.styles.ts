import styled from "@peersyst/react-native-styled";
import { Paper } from "react-native-components";

export interface MainTabsContentProps {
    activeIndex: number;
}

export const MainTabsContent = styled(Paper)<MainTabsContentProps>(({ activeIndex }) => ({
    flex: 1,
    shadowOffset: {
        height: -3,
        width: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: activeIndex === 0 ? 0 : undefined,
    borderTopRightRadius: activeIndex === 2 ? 0 : undefined,
}));
