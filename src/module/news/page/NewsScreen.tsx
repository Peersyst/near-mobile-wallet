import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Text } from "react-native";

const NewsScreen = (): JSX.Element => {
    return (
        <BasePage appearance="light" showIcons>
            <Text>News Screen</Text>
        </BasePage>
    );
};

export default NewsScreen;
