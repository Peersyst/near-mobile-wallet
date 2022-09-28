import styled from "@peersyst/react-native-styled";
import { Paper } from "@peersyst/react-native-components";

export interface MainTabsContentProps {
    activeIndex: number;
    numberOfTabs: number;
}

export const MainTabsContent = styled(Paper)<MainTabsContentProps>(({ activeIndex, numberOfTabs }) => ({
    flex: 1,
    shadowOffset: {
        height: -3,
        width: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    elevation: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: activeIndex === 0 ? 0 : undefined,
    borderTopRightRadius: activeIndex === numberOfTabs - 1 ? 0 : undefined,
}));
