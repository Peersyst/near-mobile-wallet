import Button from "module/common/component/input/Button/Button";
import StakeModal from "module/staking/component/core/StakeModal/StakeModal";
import { Row, useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

const StakingCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();

    return (
        <Row>
            <Button style={{ width: 272 }} variant="secondary" size="md" onPress={() => showModal(StakeModal)}>
                {translate("stakeMyTokens")}
            </Button>
        </Row>
    );
};

export default StakingCardButtons;
