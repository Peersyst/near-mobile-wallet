import Button from "module/common/component/input/Button/Button";
import { useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";

const StakingCardButtons = (): JSX.Element => {
    const { showModal } = useModal();
    const translate = useTranslate();

    return (
        <Button style={{ width: 272 }} variant="secondary" size="md" onPress={() => showModal(AddStakeModal)}>
            {translate("stake_my_tokens")}
        </Button>
    );
};

export default StakingCardButtons;
