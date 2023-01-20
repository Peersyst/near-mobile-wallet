import ConfirmAddStakeScreeen from "module/staking/screen/ConfirmAddStakeScreeen/ConfirmAddStakeScreeen";
import { useTranslate } from "module/common/hook/useTranslate";
import { useRecoilValue } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { useModal, useSetTab } from "@peersyst/react-native-components";
import useUnstake from "module/staking/query/useUnstake";
import UnstakeModal, { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";

const ConfirmUnstakeScreen = (): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const {
        amount,
        validator: { accountId },
    } = useRecoilValue(stakeState);

    const setTab = useSetTab();

    const { mutate: unstake, isLoading, isError, isSuccess } = useUnstake();

    const handleUnstake = () => unstake({ validatorId: accountId, amount });

    function onEdit() {
        setTab(UnstakeModalScreens.SELECT_VALIDATOR);
    }

    function handleOnExited() {
        setTab(UnstakeModalScreens.SUCCESS);
    }

    return (
        <ConfirmAddStakeScreeen
            onExited={handleOnExited}
            sendTransaction={handleUnstake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_action_of", { action: "unstaking" })}
            isSuccess={isSuccess}
            onEditValidator={onEdit}
            onCancel={() => hideModal(UnstakeModal.id)}
        />
    );
};

export default ConfirmUnstakeScreen;
