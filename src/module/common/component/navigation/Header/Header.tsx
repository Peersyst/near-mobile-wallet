import { HeaderRoot } from "./Header.styles";
import Toolbar from "../../layout/Toolbar/Toolbar";
import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { IconButton, Row } from "react-native-components";
import Notification from "module/common/component/display/Notification/Notification";
import { SettingsIcon } from "icons";
import useNativeNavigation from "../hooks/useNativeNavigation";

export interface HeaderProps {
    showIcons?: boolean;
}

const Header = ({ showIcons = true }: HeaderProps): JSX.Element => {
    const navigation = useNativeNavigation();
    return (
        <HeaderRoot elevation={6} square>
            <Toolbar>
                <Row alignItems="center" justifyContent="space-between" flex={1}>
                    <LogoRow />
                    {showIcons && (
                        <Row gap={16}>
                            <IconButton onPress={() => navigation.navigate("Notifications")}>
                                <Notification />
                            </IconButton>
                            <IconButton onPress={() => navigation.navigate("Settings")}>
                                <SettingsIcon />
                            </IconButton>
                        </Row>
                    )}
                </Row>
            </Toolbar>
        </HeaderRoot>
    );
};

export default Header;
