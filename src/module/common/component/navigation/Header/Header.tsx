import { SettingsIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../display/LinearBgLogo/LinearBgLogo";
import { HeaderIcon, HeaderRoot } from "./Header.styles";
import { Row } from "@peersyst/react-native-components";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    return (
        <HeaderRoot style={{ marginTop: top }}>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <Logo startColor="#E3935B" endColor="#FFC860" onPress={() => navigation.navigate(MainBottomScreens.HOME)} />
                <Row style={{ position: "absolute", right: 8 }}>
                    <HeaderIcon onPress={() => navigation.navigate(MainBottomScreens.SETTINGS)}>
                        <SettingsIcon />
                    </HeaderIcon>
                </Row>
            </Row>
        </HeaderRoot>
    );
};

export default Header;
