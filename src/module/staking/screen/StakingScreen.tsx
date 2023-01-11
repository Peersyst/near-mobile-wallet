import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";

const StakingScreen = (): JSX.Element => {
    return (
        <MainGradientScreen>
            {{
                slider: <StakingSlider />,
                content: <></>,
            }}
        </MainGradientScreen>
    );
};

export default StakingScreen;
