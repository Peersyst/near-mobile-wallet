import { Col } from "react-native-components";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import MainSlider from "module/main/component/core/MainSlider";
import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";

const HomeScreen = (): JSX.Element => {
    return (
        <BaseWithBackgroundMainScreen>
            <Col flex={1} gap={20} style={{ paddingTop: 10 }}>
                <MainSlider />
                <MainTabs />
            </Col>
        </BaseWithBackgroundMainScreen>
    );
};

export default HomeScreen;
