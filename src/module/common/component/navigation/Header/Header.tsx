import { SettingsIcon } from "icons";
import LinearLogo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderRoot, HeaderSettingsButton } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../MainNavigatorGroup/MainScreens";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import SelectNetworkChip from "module/settings/components/core/SelectNetworkChip/SelectNetworkChip";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    const [startColor, endColor] = useWalletGradient();
    return (
        <HeaderRoot>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <SelectNetworkChip style={{ position: "absolute", left: 8 }} />
                <LinearLogo startColor={startColor} endColor={endColor} />
                <Row style={{ position: "absolute", right: 8 }}>
                    <HeaderSettingsButton onPress={() => navigation.navigate(MainScreens.SETTINGS)}>
                        <SettingsIcon />
                    </HeaderSettingsButton>
                </Row>
            </Row>
        </HeaderRoot>
    );
};

export default Header;
