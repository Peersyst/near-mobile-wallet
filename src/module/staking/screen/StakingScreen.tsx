import StakingSlider from "module/staking/component/display/StakingSlider/StakingSlider";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import StakingTabs from "module/staking/component/navigation/StakingTabs/StakingTabs";

const StakingScreen = (): JSX.Element => {
    return (
        <MainGradientScreen>
            {{
                slider: <StakingSlider />,
                content: <StakingTabs />,
            }}
        </MainGradientScreen>
    );
};

export default StakingScreen;
