import { Appearance } from "module/common/types";
import { Row } from "../../base/layout/Row";
import Logo from "../../display/Logo/Logo";
import { HeaderRoot, SettingsIcon } from "./Header.styles";
import Notification from "../../display/Notification/Notification";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

export interface HeaderProps {
    appearance?: Appearance;
    showIcons?: boolean;
}

const Header = ({ appearance = "dark", showIcons = false }: HeaderProps): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    
    return (
        <HeaderRoot>
            <Logo size={"md"} direction={"horizontal"} appearance={appearance} />
            {showIcons && (
                <Row gap={10}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
                        <SettingsIcon />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Notifications")}>
                        <Notification />
                    </TouchableWithoutFeedback>
                </Row>
            )}
        </HeaderRoot>
    );
};

export default Header;
