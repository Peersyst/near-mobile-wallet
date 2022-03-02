import { Pressable } from "react-native";
import useNativeNavigation from "../../hooks/useNativeNavigation";
import { BottomBarLinkProps } from "../BottomBar.types";

const BottomBarLink = ({ link, children, isActive }: BottomBarLinkProps): JSX.Element => {
    const navigation = useNativeNavigation();
    const handleNavigation = () => {
        if (!isActive) {
            navigation.navigate(link);
        }
    };
    return <Pressable onPress={() => handleNavigation()}>{children}</Pressable>;
};

export default BottomBarLink;
