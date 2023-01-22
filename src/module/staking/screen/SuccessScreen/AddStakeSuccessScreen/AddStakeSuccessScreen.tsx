import { useModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import AddStakeModal from "module/staking/component/core/AddStakeModal/AddStakeModal";
import SuccessScreen from "../SuccessScreen";

const AddStakeSuccessScreen = () => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    function handleOnClose() {
        hideModal(AddStakeModal.id);
    }

    return <SuccessScreen message={translate("stake_success")} onClose={handleOnClose} />;
};

export default AddStakeSuccessScreen;
