import Button from "module/common/component/input/Button/Button";
import StakeModal from "module/staking/component/core/StakeModal/StakeModal";
import { useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

const StakingCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();

    return (
        <Button style={{ width: 272 }} variant="secondary" size="md" onPress={() => showModal(StakeModal)}>
            {translate("stake_my_tokens")}
        </Button>
    );
};

export default StakingCardButtons;
