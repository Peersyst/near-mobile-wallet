import { SettingsIcon } from "icons";
import { AppearanceProps } from "module/common/types";
import { Row } from "../../base/layout/Row";
import Logo from "../../display/Logo/Logo";
import { HeaderRoot } from "./Header.styles";
import Notification from "../../display/Notification/Notification";

const Header = ({ appearance = "dark" }: Partial<AppearanceProps>): JSX.Element => {
    return (
        <HeaderRoot>
            <Logo size={"md"} direction={"horizontal"} appearance={appearance} />
            <Row gap={10}>
                <SettingsIcon color="black" />
                <Notification />
            </Row>
        </HeaderRoot>
    );
};

export default Header;
