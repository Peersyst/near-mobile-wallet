import { SettingsIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
import LinearLogo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderRoot, HeaderSettingsButton } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    return (
        <HeaderRoot>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <LinearLogo startColor="#5F8AFA" endColor="#4FD1D9" onPress={() => navigation.navigate(MainBottomScreens.HOME)} />
                <Row style={{ position: "absolute", right: 8 }}>
                    <HeaderSettingsButton onPress={() => navigation.navigate(MainBottomScreens.SETTINGS)}>
                        <SettingsIcon />
                    </HeaderSettingsButton>
                </Row>
            </Row>
        </HeaderRoot>
    );
};

export default Header;
