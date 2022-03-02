import { image } from "asset/image/index";
import { LogoImage, LogoLinkRoot } from "./BottomBarLogoLink.styles";

const BottomBarLogoLink = (): JSX.Element => {
    return (
        <LogoLinkRoot>
            <LogoImage source={image.coloredLogo} />
        </LogoLinkRoot>
    );
};

export default BottomBarLogoLink;
