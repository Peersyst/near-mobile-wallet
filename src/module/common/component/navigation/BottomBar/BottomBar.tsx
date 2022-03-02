import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { BottomBarRoot } from "./BottomBar.styles";

const BottomBar = (props: BottomTabBarProps): JSX.Element => {
    return (
        <BottomBarRoot>
            <Text>DAO</Text>
            <Text>News</Text>
        </BottomBarRoot>
    );
};

export default BottomBar;
