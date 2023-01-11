import { Col } from "@peersyst/react-native-components";
import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";
import { MainStakingCard } from "module/staking/screen/StakingScreen.styles";
import StakingDetails from "module/staking/component/core/StakingDetails/StakingDetails";
import { ScrollView } from "react-native";

const StakingScreen = (): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <Col flex={1}>
                <ScrollView>
                    <StakingSlider />
                    <MainStakingCard>
                        <StakingDetails />
                    </MainStakingCard>
                </ScrollView>
            </Col>
        </BaseMainGradientScreen>
    );
};

export default StakingScreen;
