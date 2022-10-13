import { SettingsIcon } from "icons";
import LinearLogo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderRoot, HeaderSettingsButton } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import useNavigation from "module/common/hook/useNavigation";
import { MainScreens } from "../MainNavigatorGroup/MainScreens";

const Header = (): JSX.Element => {
    const navigation = useNavigation();

    return (
        <HeaderRoot>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <LinearLogo startColor="#5F8AFA" endColor="#4FD1D9" />
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
