import { useModal } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import WithdrawModal from "module/staking/component/core/WithdrawModal/WithdrawModal";
import StakingSuccessScreen from "../StakingSuccessScreen";

const WithdrawSuccessScreen = () => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    function handleOnClose() {
        hideModal(WithdrawModal.id);
    }

    return <StakingSuccessScreen message={translate("withdraw_success")} onClose={handleOnClose} showValidator={false} />;
};

export default WithdrawSuccessScreen;
