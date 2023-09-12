import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GridIcon, NearIcon, PinIcon } from "icons";
import { MainStackParamsList } from "stack-navigator";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarItem from "./BottomBarItem/BottomBarItem";
import { DatabaseIcon } from "module/common/icons/DatabaseIcon";
import { useTranslate } from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import { config } from "config";
import BottomBarQRScanner from "./BottomBarQRScanner/BottomBarQRScanner";
import { MainScreens } from "../MainNavigatorGroup/MainScreens";

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
                onPress={() => handleNavigation(MainScreens.STAKING)}
                isActive={activeTab === MainScreens.STAKING}
                label={capitalize(translate("staking"))}
                Icon={<DatabaseIcon />}
            />
            <BottomBarItem
                onPress={() => handleNavigation(MainScreens.HOME)}
                isActive={activeTab === MainScreens.HOME}
                label={translate("wallet")}
                Icon={<NearIcon />}
            />
            {config.signerFeature.enabled && <BottomBarQRScanner />}
            {config.signerFeature.enabled && (
                <BottomBarItem
                    onPress={() => handleNavigation(MainScreens.DAPPS)}
                    isActive={activeTab === MainScreens.DAPPS}
                    label={translate("dapps")}
                    Icon={<GridIcon />}
                />
            )}
            <BottomBarItem
                onPress={() => handleNavigation(MainScreens.NEWS)}
                isActive={activeTab === MainScreens.NEWS}
                label={translate("news")}
                Icon={<PinIcon />}
            />
        </BottomBarRoot>
    );
};

export default BottomBar;
