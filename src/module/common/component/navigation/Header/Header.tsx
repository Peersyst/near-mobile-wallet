import { AppearanceProps } from "module/common/types";
import { View, Text } from "react-native";
import BaseHeader, { BaseHeaderProps } from "../BaseHeader/BaseHeader";
import { HeaderRoot, HeaderShadow, HeaderShadowRoot } from "./Header.styles";

const Header = ({ appearance }: AppearanceProps): JSX.Element => {
    return (
        <HeaderRoot appearance={appearance}>
            <BaseHeader appearance={"dark"} showIcons={true} />
            <HeaderShadowRoot>
                <HeaderShadow>
                </HeaderShadow>
            </HeaderShadowRoot>
        </HeaderRoot>
    );
};

export default Header;
