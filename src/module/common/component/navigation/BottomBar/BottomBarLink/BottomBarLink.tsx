import useNativeNavigation from "../../hooks/useNavigation";
import { BottomBarLinkProps } from "../BottomBar.types";
import { BottomBarLinkRoot, LinkIcon, LinkText } from "./BottomBarLink.styles";

const BottomBarLink = ({ label, Icon, link, state }: BottomBarLinkProps): JSX.Element => {
    const navigation = useNativeNavigation();
    const isActive = state.routeNames[state.index] === label;
    const handleNavigation = () => {
        if (!isActive) {
            navigation.navigate(link);
        }
    };
    return (
        <BottomBarLinkRoot accessibilityRole="button" onPress={handleNavigation}>
            <LinkIcon isActive={isActive}>{Icon}</LinkIcon>
            <LinkText variant="caption" isActive={isActive}>
                {label}
            </LinkText>
        </BottomBarLinkRoot>
    );
};

export default BottomBarLink;
