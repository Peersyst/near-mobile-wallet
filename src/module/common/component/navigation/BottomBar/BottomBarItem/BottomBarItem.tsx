import { BottomBarItemProps } from "../BottomBar.types";
import { BottomBarItemRoot, LinkItemIcon, LinkItemText } from "./BottomBarItem.styles";

const BottomBarItem = ({ label, Icon, isActive, onPress }: BottomBarItemProps): JSX.Element => {
    return (
        <BottomBarItemRoot accessibilityRole="button" onPress={onPress}>
            <LinkItemIcon isActive={isActive}>{Icon}</LinkItemIcon>
            <LinkItemText variant="body2" isActive={isActive}>
                {label}
            </LinkItemText>
        </BottomBarItemRoot>
    );
};

export default BottomBarItem;
