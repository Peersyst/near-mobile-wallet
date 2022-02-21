import { Appearance } from "module/common/types";
import { Row } from "../../base/layout/Row";
import Logo from "../../display/Logo/Logo";
import { HeaderRoot, SettingsIcon } from "./Header.styles";
import Notification from "../../display/Notification/Notification";
import { TouchableWithoutFeedback } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";

export interface HeaderProps {
    appearance?: Appearance;
    showIcons?: boolean;
}

const Header = ({ appearance = "dark", showIcons = false }: HeaderProps): JSX.Element => {
    const navigation = useContext(NavigationContext);
    return (
        <HeaderRoot>
            <Logo size={"md"} direction={"horizontal"} appearance={appearance} />
            {showIcons && (
                <Row gap={10}>
                    <TouchableWithoutFeedback onPress={() => navigation?.navigate("settings")}>
                        <SettingsIcon />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation?.navigate("notifications")}>
                        <Notification />
                    </TouchableWithoutFeedback>
                </Row>
            )}
        </HeaderRoot>
    );
};

export default Header;
