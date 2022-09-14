import { MainTabContent, MainTabRoot } from "./MainTab.styles";
import { Typography, useTab } from "@peersyst/react-native-components";

export interface MainTabProps {
    index: number;
    children: string;
}

const MainTab = ({ children, index }: MainTabProps): JSX.Element => {
    const activeIndex = useTab();
    const active = activeIndex === index;

    return (
        <MainTabRoot index={index}>
            <MainTabContent active={active}>
                <Typography variant="body2" textAlign="center" light={!active}>
                    {children}
                </Typography>
            </MainTabContent>
        </MainTabRoot>
    );
};

export default MainTab;
