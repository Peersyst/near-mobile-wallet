import { useModal, useSetTab } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { useTranslate } from "module/common/hook/useTranslate";
import StakingConfirmScreen from "../StakingConfirmScreen";
import UseWithdraw from "module/staking/query/useWithdraw";
import WithdrawModal, { WithdrawModalScreens } from "module/staking/component/core/WithdrawModal/WithdrawModal";

const WithdrawConfirmScreen = () => {
    const { validator } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();
    const { mutate: withdrawStake, isLoading, isError, isSuccess } = UseWithdraw();
    const translate = useTranslate();
    const { hideModal } = useModal();

    const handleWithdrawStake = () => {
        withdrawStake({ validatorId: validator.accountId });
    };

    const onExited = () => {
        setTab(WithdrawModalScreens.SUCCESS);
    };

    return (
        <StakingConfirmScreen
            onExited={onExited}
            sendTransaction={handleWithdrawStake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_action_of", { action: "withdraw" })}
            isSuccess={isSuccess}
            onEditValidator={() => setTab(WithdrawModalScreens.SELECT_VALIDATOR)}
            onCancel={() => hideModal(WithdrawModal.id)}
        />
    );
};

export default WithdrawConfirmScreen;
