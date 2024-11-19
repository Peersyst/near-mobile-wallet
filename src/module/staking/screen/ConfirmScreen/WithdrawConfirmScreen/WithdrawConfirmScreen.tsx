import { useModal, useSetTab } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import useTranslate from "module/common/hook/useTranslate";
import StakingConfirmScreen from "../StakingConfirmScreen";
import useWithdraw from "module/staking/query/useWithdraw";
import WithdrawModal from "module/staking/component/core/WithdrawModal/WithdrawModal";
import { WithdrawModalScreens } from "module/staking/component/core/WithdrawModal/WithdrawModal.types";

const WithdrawConfirmScreen = () => {
    const { validator } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();

    const { mutate: withdrawStake, isLoading, isError, isSuccess } = useWithdraw();
    const translate = useTranslate();
    const { hideModal } = useModal();

    const handleWithdrawStake = () => {
        withdrawStake({ validatorId: validator.accountId });
    };

    return (
        <StakingConfirmScreen
            sendTransaction={handleWithdrawStake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_action_of", { action: translate("withdraw") })}
            isSuccess={isSuccess}
            onEditValidator={() => setTab(WithdrawModalScreens.SELECT_VALIDATOR)}
            onCancel={() => hideModal(WithdrawModal.id)}
        />
    );
};

export default WithdrawConfirmScreen;
