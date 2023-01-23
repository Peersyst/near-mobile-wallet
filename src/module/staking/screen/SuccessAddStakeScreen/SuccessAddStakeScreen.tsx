import { useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";
import StakeSuccessScreen from "../SuccessStakeScreen/SuccessStakeScreen";

const SuccessAddStakeScreen = () => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    function handleOnClose() {
        hideModal(AddStakeModal.id);
    }

    return <StakeSuccessScreen message={translate("stake_success")} onClose={handleOnClose} />;
};

export default SuccessAddStakeScreen;
