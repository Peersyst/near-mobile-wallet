import HomeSlider from "module/home/component/core/HomeSlider/HomeSlider";
import HomeTabs from "../component/navigation/HomeTabs";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";

const HomeScreen = (): JSX.Element => {
    return (
        <MainGradientScreen>
            {{
                slider: <HomeSlider />,
                content: <HomeTabs />,
            }}
        </MainGradientScreen>
    );
};

export default HomeScreen;
