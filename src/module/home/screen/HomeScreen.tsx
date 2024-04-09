import HomeSlider from "module/home/component/core/HomeSlider/HomeSlider";
import HomeTabs from "../component/navigation/HomeTabs";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import useShowSignerRequest from "module/signer/hooks/useShowSignerRequest";

import { useEffect } from "react";
import { useAppState } from "@react-native-community/hooks";
import useIsUpdateAvailable from "../hook/useIsUpdateAvailable";
import useShowUpdateAvailableModal from "../hook/useShowUpdateAvailableModal";

const HomeScreen = (): JSX.Element => {
    const appState = useAppState();
    const showSignerRequest = useShowSignerRequest();
    const isUpdateAvailable = useIsUpdateAvailable();
    const { showUpdateAvailableModal } = useShowUpdateAvailableModal();

    useEffect(() => {
        if (appState === "active") showSignerRequest();
        //if (isUpdateAvailable)
        showUpdateAvailableModal();
    }, [appState, isUpdateAvailable]);

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
