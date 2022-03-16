import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Col } from "react-native-components";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import MainSlider from "module/main/component/core/MainSlider";
import { CardBackgroundHome } from "./HomeScreen.styles";

const HomeScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <CardBackgroundHome />
            <Col flex={1} gap={20}>
                <MainSlider />
                <MainTabs />
            </Col>
        </BaseMainScreen>
    );
};

export default HomeScreen;
