import { BottomBarItemProps } from "../BottomBar.types";
import { BottomBarLinkRoot, LinkItemIcon, LinkItemText } from "./BottomBarItem.styles";

const BottomBarItem = ({ label, Icon, isActive, onPress }: BottomBarItemProps): JSX.Element => {
    return (
        <BottomBarLinkRoot 
        accessibilityRole="button"
        onPress={onPress}>
            <LinkItemIcon isActive={isActive}>{Icon}</LinkItemIcon>
            <LinkItemText variant="caption" isActive={isActive}>
                {label}
            </LinkItemText>
        </BottomBarLinkRoot>
    );
};

export default BottomBarItem;
