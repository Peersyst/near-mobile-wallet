import StakingDetails from "module/staking/component/display/StakingDetails/StakingDetails";
import { MainStakingCard } from "module/staking/screen/StakingScreen.styles";
import StakingCurrentValidators from "module/staking/component/display/StakingCurrentValidators/StakingCurrentValidators";
import { Col } from "@peersyst/react-native-components";

const StakingScreenContent = (): JSX.Element => {
    return (
        <Col gap={12}>
            <MainStakingCard>
                <StakingDetails />
            </MainStakingCard>
            <MainStakingCard>
                <StakingCurrentValidators />
            </MainStakingCard>
        </Col>
    );
};

export default StakingScreenContent;
