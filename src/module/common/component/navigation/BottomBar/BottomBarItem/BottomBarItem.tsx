import { BottomBarItemProps } from "../BottomBar.types";
import { BottomBarLinkRoot, LinkItemIcon, LinkItemText } from "./BottomBarItem.styles";

const BottomBarItem = ({ label, Icon, state }: BottomBarItemProps): JSX.Element => {
    
    const isActive = state.routeNames[state.index] === label;
 
    return (
        <BottomBarLinkRoot>
            <LinkItemIcon isActive={isActive}>{Icon}</LinkItemIcon>
            <LinkItemText variant="caption" isActive={isActive}>
                {label}
            </LinkItemText>
        </BottomBarLinkRoot>
    );
};

export default BottomBarItem;
