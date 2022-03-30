import { Col } from "react-native-components";
import HomeSlider from "module/home/component/core/HomeSlider";
import BaseWithBackgroundMainScreen from "module/main/component/layout/BaseWithBackgroundMainScreen/BaseWithBackgroundMainScreen";
import HomeTabs from "module/home/component/navigation/HomeTabs/HomeTabs";

const HomeScreen = (): JSX.Element => {
    return (
        <BaseWithBackgroundMainScreen>
            <Col flex={1} gap={20} style={{ paddingTop: 10 }}>
                <HomeSlider />
                <HomeTabs />
            </Col>
        </BaseWithBackgroundMainScreen>
    );
};

export default HomeScreen;
