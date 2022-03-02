import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NewsIcon } from "icons";
import { MainScreens } from "module/main/MainNavigatorGroup";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import BottomBarLink from "./BottomBarLink/BottomBarLink";
import BottomBarLogoItem from "./BottomBarLogoItem/BottomBarLogoItem";

const BottomBar = ({ state }: BottomTabBarProps): JSX.Element => {
    const activeTab = state.routeNames[state.index];
    return (
        <BottomBarRoot>
            <BottomBarLink isActive={activeTab === MainScreens.DAO} link={MainScreens.DAO}>
                <BottomBarItem state={state} label={MainScreens.DAO} Icon={<DAOIcon />} />
            </BottomBarLink>
            <BottomBarLink isActive={activeTab === MainScreens.DAO} link={MainScreens.DAO}>
                <BottomBarLogoItem />
            </BottomBarLink>
            <BottomBarLink isActive={activeTab === MainScreens.NEWS} link={MainScreens.NEWS}>
                <BottomBarItem state={state} label={MainScreens.NEWS} Icon={<NewsIcon />} />
            </BottomBarLink>
        </BottomBarRoot>
    );
};

export default BottomBar;
