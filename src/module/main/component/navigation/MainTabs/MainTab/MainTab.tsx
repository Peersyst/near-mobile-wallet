import { MainTabRoot } from "./MainTab.styles";
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
            <Typography variant="body3Strong" textAlign="center" light={!active}>
                {children}
            </Typography>
        </MainTabRoot>
    );
};

export default MainTab;
