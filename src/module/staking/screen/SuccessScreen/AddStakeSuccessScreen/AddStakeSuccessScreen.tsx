import { useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";
import StakingSuccessScreen from "../StakingSuccessScreen";

const AddStakeSuccessScreen = () => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    function handleOnClose() {
        hideModal(AddStakeModal.id);
    }

    return <StakingSuccessScreen message={translate("stake_success")} onClose={handleOnClose} />;
};

export default AddStakeSuccessScreen;
