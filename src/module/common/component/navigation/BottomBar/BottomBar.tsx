import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DAOIcon, NewsIcon } from "icons";
import { BottomBarRoot } from "./BottomBar.styles";
import BottomBarLink from "./BottomBarLink/BottomBarLink";
import BottomBarLogoLink from "./BottomBarLogoLink/BottomBarLogoLink";

const BottomBar = (props: BottomTabBarProps): JSX.Element => {
    return (
        <BottomBarRoot>
            <BottomBarLink {...props} label={"Dao"} link={"Dao"} Icon={<DAOIcon />} />
            <BottomBarLogoLink {...props} />
            <BottomBarLink {...props} label={"News"} link={"News"} Icon={<NewsIcon />} />
        </BottomBarRoot>
    );
};

export default BottomBar;
