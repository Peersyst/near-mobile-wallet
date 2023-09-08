import HomeSlider from "module/home/component/core/HomeSlider/HomeSlider";
import HomeTabs from "../component/navigation/HomeTabs";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import useShowSignerRequest from "module/signer/hooks/useShowSignerRequest";

import { useEffect } from "react";

const HomeScreen = (): JSX.Element => {
    const showSignerRequest = useShowSignerRequest();

    useEffect(() => {
        showSignerRequest();
    }, []);

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
