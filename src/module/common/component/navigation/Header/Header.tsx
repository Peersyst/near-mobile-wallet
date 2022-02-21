import { SettingsIcon } from "icons";
import { Appearance } from "module/common/types";
import { Row } from "../../base/layout/Row";
import Logo from "../../display/Logo/Logo";
import { HeaderRoot } from "./Header.styles";
import Notification from "../../display/Notification/Notification";

export interface HeaderProps {
    appearance?: Appearance;
    showIcons?: boolean;
}

const Header = ({ appearance = "dark", showIcons = false }: HeaderProps): JSX.Element => {
    
    return (
        <HeaderRoot>
            <Logo size={"md"} direction={"horizontal"} appearance={appearance} />
            {showIcons && (
                <Row gap={10}>
                    <SettingsIcon color="black" />
                    <Notification />
                </Row>
            )}
        </HeaderRoot>
    );
};

export default Header;
