import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import StakingScreenContent from "module/staking/screen/StakingScreen/StakingScreenContent/StakingScreenContent";

const StakingScreen = (): JSX.Element => {
    return (
        <MainGradientScreen scrollable>
            {{
                slider: <StakingSlider />,
                content: <StakingScreenContent />,
            }}
        </MainGradientScreen>
    );
};

export default StakingScreen;
