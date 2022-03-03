import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NewsIcon } from "icons";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { MainStackParamsList } from "stack-navigator";
import useNativeNavigation from "../hooks/useNativeNavigation";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import BottomBarLogoItem from "./BottomBarLogoItem/BottomBarLogoItem";

const BottomBar = ({ state }: BottomTabBarProps): JSX.Element => {
    const activeTab = state.routeNames[state.index];
    const navigation = useNativeNavigation();
    const handleNavigation = (link: keyof MainStackParamsList) => {
        if (activeTab !== link) {
            navigation.navigate(link);
        }
    };
    return (
        <BottomBarRoot>
            <BottomBarItem
                onPress={() => handleNavigation(MainScreens.DAO)}
                isActive={activeTab === MainScreens.DAO}
                label={MainScreens.DAO}
                Icon={<DAOIcon />}
            />
            <BottomBarLogoItem onPress={() => handleNavigation(MainScreens.HOME)}/>
            <BottomBarItem
                onPress={() => handleNavigation(MainScreens.NEWS)}
                isActive={activeTab === MainScreens.NEWS}
                label={MainScreens.NEWS}
                Icon={<NewsIcon />}
            />
        </BottomBarRoot>
    );
};

export default BottomBar;
