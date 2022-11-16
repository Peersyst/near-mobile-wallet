import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NearIcon, PinIcon } from "icons";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { MainStackParamsList } from "stack-navigator";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import { DatabaseIcon } from "module/common/icons/DatabaseIcon";
import { useTranslate } from "module/common/hook/useTranslate";

type BottomBarProps = Pick<BottomTabBarProps, "state" | "navigation">;

const BottomBar = ({ state, navigation }: BottomBarProps): JSX.Element => {
    const translate = useTranslate();
    const activeTab = state.routeNames[state.index];
    const handleNavigation = (link: keyof MainStackParamsList) => {
        if (activeTab !== link) {
            navigation.navigate(link);
        }
    };
    return (
        <BottomBarRoot>
            <BottomBarItem
                onPress={() => handleNavigation(MainBottomScreens.DAO)}
                isActive={activeTab === MainBottomScreens.DAO}
                label={translate("DAO")}
                Icon={<DAOIcon />}
            />
            <BottomBarItem
                onPress={() => handleNavigation(MainBottomScreens.HOME)}
                isActive={activeTab === MainBottomScreens.HOME}
                label={translate("wallet")}
                Icon={<NearIcon />}
            />
            <BottomBarItem
                onPress={() => handleNavigation(MainBottomScreens.NEWS)}
                isActive={activeTab === MainBottomScreens.NEWS}
                label={translate("news")}
                Icon={<PinIcon />}
            />
        </BottomBarRoot>
    );
};

export default BottomBar;
