import { AppearanceProps } from "module/common/types";
import BaseHeader, { BaseHeaderProps } from "../BaseHeader/BaseHeader";
import { HeaderRoot } from "./Header.styles";

const Header = ({ appearance }: AppearanceProps): JSX.Element => {
    return (
        <HeaderRoot appearance={ appearance } >
            <BaseHeader appearance={"dark"} showIcons={true}/>
        </HeaderRoot>
    );
};

export default Header;
