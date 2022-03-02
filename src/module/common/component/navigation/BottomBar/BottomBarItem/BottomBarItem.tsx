import { BottomBarItemProps } from "../BottomBar.types";
import { BottomBarLinkRoot, LinkItemIcon, LinkItemText } from "./BottomBarItem.styles";

const BottomBarItem = ({ label, Icon, isActive }: BottomBarItemProps): JSX.Element => {
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
