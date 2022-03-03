import { image } from "asset/image/index";
import { LogoImage, BottomBarLogoItemRoot, PressableImageRoot } from "./BottomBarLogoItem.styles";

interface BottomBarLogoItemProps {
    onPress: () => void;
}

const BottomBarLogoItem = ({ onPress }: BottomBarLogoItemProps): JSX.Element => {
    return (
        <BottomBarLogoItemRoot>
            <PressableImageRoot accessibilityRole="imagebutton" onPress={onPress}>
                <LogoImage accessibilityRole="image" source={image.coloredLogo} />
            </PressableImageRoot>
        </BottomBarLogoItemRoot>
    );
};

export default BottomBarLogoItem;
