import { SettingsIcon } from "icons";
import LinearLogo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderRoot, HeaderSettingsButton } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../MainNavigatorGroup/MainScreens";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import Chip from "../../display/Chip/Chip";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    const [startColor, endColor] = useWalletGradient();
    const { network } = useRecoilValue(settingsState);

    return (
        <HeaderRoot>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <Row style={{ position: "absolute", left: 8 }}>
                    <Chip
                        label={network.toUpperCase()}
                        variant="filled"
                        size="sm"
                        style={{ backgroundColor: startColor, color: "white" }}
                    />
                </Row>
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
