import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GridIcon, NearIcon, PinIcon } from "icons";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import { MainStackParamsList } from "stack-navigator";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import { DatabaseIcon } from "module/common/icons/DatabaseIcon";
import { useTranslate } from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import { config } from "config";
import BottomBarQRScanner from "./BottomBarQRScanner/BottomBarQRScanner";

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
                onPress={() => handleNavigation(MainBottomScreens.STAKING)}
                isActive={activeTab === MainBottomScreens.STAKING}
                label={capitalize(translate("staking"))}
                Icon={<DatabaseIcon />}
            />
            <BottomBarItem
                onPress={() => handleNavigation(MainBottomScreens.HOME)}
                isActive={activeTab === MainBottomScreens.HOME}
                label={translate("wallet")}
                Icon={<NearIcon />}
            />
            {config.signerFeature.enabled && <BottomBarQRScanner />}
            {config.signerFeature.enabled && (
                <BottomBarItem
                    onPress={() => handleNavigation(MainBottomScreens.DAPPS)}
                    isActive={activeTab === MainBottomScreens.DAPPS}
                    label={translate("dapps")}
                    Icon={<GridIcon />}
                />
            )}
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
