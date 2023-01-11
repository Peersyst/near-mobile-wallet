import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NearIcon, PinIcon } from "icons";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { MainStackParamsList } from "stack-navigator";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import { DatabaseIcon } from "module/common/icons/DatabaseIcon";
import { useTranslate } from "module/common/hook/useTranslate";
import { useModal } from "@peersyst/react-native-components";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";

type BottomBarProps = Pick<BottomTabBarProps, "state" | "navigation">;

const BottomBar = ({ state, navigation }: BottomBarProps): JSX.Element => {
    const translate = useTranslate();
    const activeTab = state.routeNames[state.index];
    const handleNavigation = (link: keyof MainStackParamsList) => {
        if (activeTab !== link) {
            navigation.navigate(link);
        }
    };
    const { showModal } = useModal();
    return (
        <BottomBarRoot>
            <BottomBarItem
                onPress={() => showModal(AddStakeModal)}
                isActive={activeTab === MainBottomScreens.STAKING}
                label={translate("staking")}
                Icon={<DatabaseIcon />}
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
