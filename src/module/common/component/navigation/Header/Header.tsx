import { HeaderRoot } from "./Header.styles";
import Toolbar from "../../layout/Toolbar/Toolbar";
import LogoRow from "module/common/component/display/Logos/LogoRow/LogoRow";
import { IconButton, Row } from "react-native-components";
import Notification from "module/common/component/display/Notification/Notification";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import { SettingsIcon } from "icons";

export interface HeaderProps {
    showIcons?: boolean;
}

const Header = ({ showIcons = true }: HeaderProps): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
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
