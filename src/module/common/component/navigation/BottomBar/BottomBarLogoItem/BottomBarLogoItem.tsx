import { BottomBarLogoItemRoot, PressableImageRoot, BomotBarLogoItemWrapper } from "./BottomBarLogoItem.styles";
import Isotip from "module/common/component/display/Logos/Isotip/Isotip";
import { ThemeProvider } from "@peersyst/react-native-styled";
import darkTheme from "config/theme/darkTheme";

interface BottomBarLogoItemProps {
    onPress: () => void;
}

const BottomBarLogoItem = ({ onPress }: BottomBarLogoItemProps): JSX.Element => {
    return (
        <ThemeProvider theme={darkTheme}>
            <BottomBarLogoItemRoot>
                <BomotBarLogoItemWrapper>
                    <PressableImageRoot accessibilityRole="imagebutton" onPress={onPress}>
                        <Isotip size="sm" />
                    </PressableImageRoot>
                </BomotBarLogoItemWrapper>
            </BottomBarLogoItemRoot>
        </ThemeProvider>
    );
};

export default BottomBarLogoItem;
