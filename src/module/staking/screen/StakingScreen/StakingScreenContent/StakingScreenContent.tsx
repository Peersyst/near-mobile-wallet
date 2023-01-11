import StakingDetails from "module/staking/component/core/StakingDetails/StakingDetails";
import { MainStakingCard } from "module/staking/screen/StakingScreen.styles";

const StakingScreenContent = (): JSX.Element => {
    return (
        <MainStakingCard>
            <StakingDetails />
        </MainStakingCard>
    );
};

export default StakingScreenContent;
