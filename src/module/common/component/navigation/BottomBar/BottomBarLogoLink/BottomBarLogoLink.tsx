import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { image } from "asset/image/index";
import useJumpTo from "../hook/useJumpTo";
import { LogoImage, LogoLinkRoot } from "./BottomBarLogoLink.styles";

const BottomBarLogoLink = ({ state }: BottomTabBarProps): JSX.Element => {
    const isActive = state.routeNames[state.index] === "Home";

    const handleNavigation = useJumpTo({ isActive: isActive, link: "Home" });
    return (
        <LogoLinkRoot onPress={()=>handleNavigation}>
            <LogoImage source={image.coloredLogo} />
        </LogoLinkRoot>
    );
};

export default BottomBarLogoLink;