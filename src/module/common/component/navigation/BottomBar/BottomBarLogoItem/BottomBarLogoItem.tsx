import { image } from "asset/image/index";
import { LogoImage, LogoItemRoot, PressableImageRoot } from "./BottomBarLogoItem.styles";

interface BottomBarLogoItemProps {
    onPress: () => void;
}

const BottomBarLogoItem = ({ onPress }: BottomBarLogoItemProps): JSX.Element => {
    return (
        <LogoItemRoot>
            <PressableImageRoot accessibilityRole="imagebutton" onPress={onPress}>
                <LogoImage accessibilityRole="image" source={image.coloredLogo} />
            </PressableImageRoot>
        </LogoItemRoot>
    );
};

export default BottomBarLogoItem;
