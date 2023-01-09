import { ScrollView } from "@peersyst/react-native-components";
import BaseMainGradientScreen from "module/main/component/layout/BaseMainGradientScreen/BaseMainGradientScreen";
import StakingSlider from "module/staking/component/core/StakingSlider/StakingSlider";

const StakingScreen = (): JSX.Element => {
    return (
        <BaseMainGradientScreen>
            <ScrollView>
                <StakingSlider />
            </ScrollView>
        </BaseMainGradientScreen>
    );
};

export default StakingScreen;
