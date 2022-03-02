import { image } from "asset/image/index";
import { LogoImage, LogoItemRoot } from "./BottomBarLogoItem.styles";

interface BottomBarLogoItem {
    isActive: boolean;
}

const BottomBarLogoItem = (): JSX.Element => {
    return (
        <LogoItemRoot >
            <LogoImage source={image.coloredLogo} />
        </LogoItemRoot>
    );
};

export default BottomBarLogoItem;
