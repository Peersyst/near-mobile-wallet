import { Platform, StatusBar } from "react-native";
import BaseHeader, { BaseHeaderProps } from "../BaseHeader/BaseHeader";
import { HeaderRoot, HeaderShadow, HeaderShadowRoot } from "./Header.styles";

const Header = ({ appearance = "dark", showIcons }: Omit<BaseHeaderProps, "styles">): JSX.Element => {
    const BaseHeaderAppearance = appearance === "dark" ? "light" : "dark";
    return (
        <HeaderRoot appearance={appearance}>
            <BaseHeader appearance={BaseHeaderAppearance} showIcons={showIcons} />
            {appearance === "light" && (
                <HeaderShadowRoot>
                    <HeaderShadow></HeaderShadow>
                </HeaderShadowRoot>
            )}
        </HeaderRoot>
    );
};

export default Header;
