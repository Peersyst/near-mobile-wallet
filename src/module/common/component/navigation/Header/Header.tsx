import { HeaderIcon, HeaderRoot } from "./Header.styles";
import { IconButton, Row } from "react-native-components";
import { SettingsIcon } from "icons";
import useNavigation from "../../../hook/useNavigation";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../../display/LinearBgLogo/LinearBgLogo";

const Header = (): JSX.Element => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    return (
        <HeaderRoot style={{ marginTop: top }}>
            <Row alignItems="center" justifyContent="center" flex={1}>
                <Logo startColor="#E3935B" endColor="#FFC860" />
                <Row style={{ position: "absolute", right: 8 }}>
                    <HeaderIcon onPress={() => navigation.navigate("Settings")}>
                        <SettingsIcon />
                    </HeaderIcon>
                </Row>
            </Row>
        </HeaderRoot>
    );
};

export default Header;
