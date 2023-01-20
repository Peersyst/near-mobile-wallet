import { useModal, useSetTab } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import AddStakeModal, { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import useAddStake from "module/staking/query/useAddStake";
import ConfirmAddStakeScreeen from "../ConfirmAddStakeScreeen/ConfirmAddStakeScreeen";

const AddStakeScreen = () => {
    const { amount, validator } = useRecoilValue(stakeRecoilState);
    const setTab = useSetTab();
    const { index } = useSelectedWallet();
    const { mutate: addStake, isLoading, isError, isSuccess } = useAddStake(index);
    const translate = useTranslate();
    const { hideModal } = useModal();

    const handleAddStake = () => {
        addStake({ validatorId: validator.accountId, amount: amount });
    };

    const onExited = () => {
        setTab(AddStakeScreens.SUCCESS);
    };

    return (
        <ConfirmAddStakeScreeen
            onExited={onExited}
            sendTransaction={handleAddStake}
            isLoading={isLoading}
            isError={isError}
            label={translate("confirm_new_action_of", { action: "staking" })}
            isSuccess={isSuccess}
            onEditValidator={() => setTab(AddStakeScreens.SELECT_VALIDATOR)}
            onCancel={() => hideModal(AddStakeModal.id)}
        />
    );
};

export default AddStakeScreen;
