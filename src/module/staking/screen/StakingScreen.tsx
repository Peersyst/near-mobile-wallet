import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";
import MainGradientScreen from "module/main/component/layout/MainGradientScreen/MainGradientScreen";
import { MainStakingCard } from "module/staking/screen/StakingScreen.styles";
import StakingTabs from "module/staking/component/navigation/StakingTabs/StakingTabs";

const StakingScreen = (): JSX.Element => {
    return (
        <MainGradientScreen>
            {{
                slider: <StakingSlider />,
                content: (
                    <MainStakingCard>
                        <StakingTabs />
                    </MainStakingCard>
                ),
            }}
        </MainGradientScreen>
    );
};

export default StakingScreen;
