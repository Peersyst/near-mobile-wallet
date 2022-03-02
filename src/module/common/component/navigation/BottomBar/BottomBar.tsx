import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NewsIcon } from "icons";
import { Text } from "react-native";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarLink from "./BottomBarLink/BottomBarLink";
import BottomBarLogoLink from "./BottomBarLogoLink/BottomBarLogoLink";

const BottomBar = (props: BottomTabBarProps): JSX.Element => {
    return (
        <BottomBarRoot>
            <BottomBarLink label={"DAO"} link={"Home"} Icon={<DAOIcon />} />
            <BottomBarLogoLink />
            <BottomBarLink label={"News"} link={"News"} Icon={<NewsIcon />} />
        </BottomBarRoot>
    );
};

export default BottomBar;
