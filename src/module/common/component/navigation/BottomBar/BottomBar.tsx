import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NewsIcon } from "icons";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { MainStackParamsList } from "stack-navigator";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import BottomBarLogoItem from "./BottomBarLogoItem/BottomBarLogoItem";
import { translate } from "locale";

type BottomBarProps = Pick<BottomTabBarProps, "state" | "navigation">;

const BottomBar = ({ state, navigation }: BottomBarProps): JSX.Element => {
    const activeTab = state.routeNames[state.index];
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
                label={translate("dao")}
                Icon={<DAOIcon />}
            />
            <BottomBarLogoItem onPress={() => handleNavigation(MainScreens.HOME)} />
            <BottomBarItem
                onPress={() => handleNavigation(MainScreens.NEWS)}
                isActive={activeTab === MainScreens.NEWS}
                label={translate("news")}
                Icon={<NewsIcon />}
            />
        </BottomBarRoot>
    );
};

export default BottomBar;
